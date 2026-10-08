import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProvisioningOrder, ProvisioningOrderDocument } from './provisioning.schema';
import { IdempotencyInterceptor } from 'kafka-toolkit';

@Controller()
export class AppController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    @InjectModel(ProvisioningOrder.name) private provisioningModel: Model<ProvisioningOrderDocument>,
  ) {}

  @UseInterceptors(IdempotencyInterceptor)
  @EventPattern('activation.requested')
  async handleActivationRequested(@Payload() message: any) {
    console.log('Provisioning procesando...', message.customerId);
    
    // Retardo simulado
    await new Promise(resolve => setTimeout(resolve, 2000));

    const event = {
      eventId: crypto.randomUUID(),
      correlationId: message.correlationId,
      customerId: message.customerId,
      eventType: 'ProvisioningCompleted'
    };

    if (message.payload?.simulateFailure === 'provisioning') {
      console.log(`Fallo simulado en provisioning para ${message.customerId}`);
      event.eventType = 'ProvisioningFailed';
    } else {
      console.log(`Línea aprovisionada para ${message.customerId}`);
      await this.provisioningModel.create({
        _id: message.correlationId,
        customerId: message.customerId,
        status: 'COMPLETED'
      });
    }

    this.kafkaClient.emit('provisioning.events', event);
  }

  @UseInterceptors(IdempotencyInterceptor)
  @EventPattern('activation.events')
  async handleActivationEvents(@Payload() message: any) {
    if (message.eventType === 'ActivationFailed') {
      const order = await this.provisioningModel.findById(message.correlationId);
      if (order && order.status === 'COMPLETED') {
        console.log(`Activación fallida detectada. Deshaciendo aprovisionamiento de ${message.customerId}...`);
        order.status = 'CANCELLED';
        await order.save();
        
        this.kafkaClient.emit('provisioning.events', {
          eventId: crypto.randomUUID(),
          correlationId: message.correlationId,
          customerId: message.customerId,
          eventType: 'ProvisioningCancelled'
        });
      }
    }
  }
}
