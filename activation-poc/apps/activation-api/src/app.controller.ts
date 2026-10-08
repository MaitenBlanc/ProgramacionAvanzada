import { Body, Controller, Post, Get, Param, HttpCode, HttpStatus, Inject, UseInterceptors, NotFoundException } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { Activation, ActivationDocument } from './activation.schema';
import { OutboxEvent, OutboxEventDocument } from './outbox.schema';
import { EventsGateway } from './events.gateway';
import { IdempotencyInterceptor } from 'kafka-toolkit';

@Controller('activations')
export class AppController {
 constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    @InjectModel(Activation.name) private activationModel: Model<ActivationDocument>,
    @InjectModel(OutboxEvent.name) private outboxModel: Model<OutboxEventDocument>,
    @InjectConnection() private connection: Connection,
    private readonly eventsGateway: EventsGateway,
  ) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED)
  async createActivation(@Body() body: any) {
    const eventId = crypto.randomUUID();
    const correlationId = `act-${Date.now()}`;
    const customerId = body.customerId || 'C-1234';
    
    const session = await this.connection.startSession();
    session.startTransaction();
    
    try {
      const newActivation = new this.activationModel({
        _id: correlationId,
        customerId,
        planId: body.planId || 'FLOW-FULL',
        status: 'PENDING',
        history: [{ eventType: 'ActivationRequested', at: new Date() }]
      });
      await newActivation.save({ session });

      const event = {
        eventId,
        eventType: 'ActivationRequested',
        correlationId,
        customerId,
        payload: { planId: newActivation.planId, simulateFailure: body.simulateFailure || 'none' }
      };

      const outboxEvent = new this.outboxModel({
        topic: 'activation.requested',
        payload: event
      });
      await outboxEvent.save({ session });

      await session.commitTransaction();
      
      // UI instant update
      this.eventsGateway.broadcastEvent(event);
      
      return { activationId: correlationId, status: 'PENDING' };
    } catch (e) {
      await session.abortTransaction();
      throw e;
    } finally {
      await session.endSession();
    }
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

    const session = await this.connection.startSession();
    session.startTransaction();

    try {
      const activation = await this.activationModel.findById(message.correlationId).session(session);
      if (!activation || activation.status === 'FAILED' || activation.status === 'ACTIVE') {
        await session.abortTransaction();
        await session.endSession();
        return;
      }

      activation[service] = { status: message.eventType.includes('Failed') ? 'ERROR' : 'OK', at: new Date() };
      activation.history.push({ eventType: message.eventType, at: new Date() });
      activation.status = 'IN_PROGRESS';

      let outboxEvent;
      if (activation.billing?.status === 'ERROR' || activation.provisioning?.status === 'ERROR') {
        activation.status = 'FAILED';
        const failedEvent = {
          eventId: crypto.randomUUID(), eventType: 'ActivationFailed',
          correlationId: message.correlationId, customerId: message.customerId
        };
        outboxEvent = new this.outboxModel({ topic: 'activation.events', payload: failedEvent });
        this.eventsGateway.broadcastEvent(failedEvent);
      } 
      else if (activation.billing?.status === 'OK' && activation.provisioning?.status === 'OK') {
        activation.status = 'ACTIVE';
        const completedEvent = {
          eventId: crypto.randomUUID(), eventType: 'ActivationCompleted',
          correlationId: message.correlationId, customerId: message.customerId
        };
        outboxEvent = new this.outboxModel({ topic: 'activation.events', payload: completedEvent });
        this.eventsGateway.broadcastEvent(completedEvent);
      }

      await activation.save({ session });
      if (outboxEvent) {
        await outboxEvent.save({ session });
      }

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      await session.endSession();
    }
  }
}
