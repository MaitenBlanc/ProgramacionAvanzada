import { Body, Controller, Post, Get, Param, HttpCode, HttpStatus, Inject, UseInterceptors, NotFoundException } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Activation, ActivationDocument } from './activation.schema';
import { EventsGateway } from './events.gateway';
import { IdempotencyInterceptor } from 'kafka-toolkit';

@Controller('activations')
export class AppController {
 constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    @InjectModel(Activation.name) private activationModel: Model<ActivationDocument>,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async createActivation(@Body() body: any) {
    const eventId = crypto.randomUUID();
    const correlationId = `act-${Date.now()}`;
    const customerId = body.customerId || 'C-1234';
    
    const newActivation = new this.activationModel({
      _id: correlationId,
      customerId,
      planId: body.planId || 'FLOW-FULL',
      status: 'PENDING',
      history: [{ eventType: 'ActivationRequested', at: new Date() }]
    });
    await newActivation.save();

    const event = {
      eventId,
      eventType: 'ActivationRequested',
      correlationId,
      customerId,
      payload: { planId: newActivation.planId, simulateFailure: body.simulateFailure || 'none' }
    };

    this.kafkaClient.emit('activation.requested', event);
    this.eventsGateway.broadcastEvent(event);
    
    return { activationId: correlationId, status: 'PENDING' };
  }

  @Get(':id')
  async getActivation(@Param('id') id: string) {
    const activation = await this.activationModel.findById(id);
    if (!activation) {
      throw new NotFoundException('Activation not found');
    }
    return activation;
  }

  @UseInterceptors(IdempotencyInterceptor)
  @EventPattern('billing.events')
  async handleBillingEvents(@Payload() message: any) {
    await this.processSaga(message, 'billing');
  }

  @UseInterceptors(IdempotencyInterceptor)
  @EventPattern('provisioning.events')
  async handleProvisioningEvents(@Payload() message: any) {
    await this.processSaga(message, 'provisioning');
  }

  private async processSaga(message: any, service: 'billing' | 'provisioning') {
    this.eventsGateway.broadcastEvent(message);

    const activation = await this.activationModel.findById(message.correlationId);
    if (!activation || activation.status === 'FAILED' || activation.status === 'ACTIVE') return;

    activation[service] = { status: message.eventType.includes('Failed') ? 'ERROR' : 'OK', at: new Date() };
    activation.history.push({ eventType: message.eventType, at: new Date() });
    activation.status = 'IN_PROGRESS';

    if (activation.billing?.status === 'ERROR' || activation.provisioning?.status === 'ERROR') {
      activation.status = 'FAILED';
      const failedEvent = {
        eventId: crypto.randomUUID(), eventType: 'ActivationFailed',
        correlationId: message.correlationId, customerId: message.customerId
      };
      this.kafkaClient.emit('activation.events', failedEvent);
      this.eventsGateway.broadcastEvent(failedEvent);
    } 
    else if (activation.billing?.status === 'OK' && activation.provisioning?.status === 'OK') {
      activation.status = 'ACTIVE';
      const completedEvent = {
        eventId: crypto.randomUUID(), eventType: 'ActivationCompleted',
        correlationId: message.correlationId, customerId: message.customerId
      };
      this.kafkaClient.emit('activation.events', completedEvent);
      this.eventsGateway.broadcastEvent(completedEvent);
    }

    await activation.save();
  }
}
