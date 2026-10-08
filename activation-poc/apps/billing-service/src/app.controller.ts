import { Controller, Inject, UseInterceptors } from '@nestjs/common';
import { ClientKafka, EventPattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BillingAccount, BillingAccountDocument } from './billing.schema';
import { IdempotencyInterceptor } from 'kafka-toolkit';

@Controller()
export class AppController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
    @InjectModel(BillingAccount.name) private billingModel: Model<BillingAccountDocument>,
  ) {}

  @UseInterceptors(IdempotencyInterceptor)
  @EventPattern('activation.requested')
  async handleActivationRequested(@Payload() message: any) {
    console.log('Billing recibió ActivationRequested:', message.correlationId);
    
    const event = {
      eventId: crypto.randomUUID(),
      correlationId: message.correlationId,
      customerId: message.customerId,
      eventType: 'BillingAccountCreated'
    };

    if (message.payload?.simulateFailure === 'billing') {
      console.log(`Simulando fallo de facturación para ${message.customerId}`);
      event.eventType = 'BillingFailed';
    } else {
      console.log(`Cuenta creada exitosamente para ${message.customerId}`);
      await this.billingModel.create({
        _id: message.correlationId,
        customerId: message.customerId,
        status: 'CREATED'
      });
    }

    this.kafkaClient.emit('billing.events', event);
  }

  @UseInterceptors(IdempotencyInterceptor)
  @EventPattern('activation.events')
  async handleActivationEvents(@Payload() message: any) {
    if (message.eventType === 'ActivationFailed') {
      const account = await this.billingModel.findById(message.correlationId);
      if (account && account.status === 'CREATED') {
        console.log(`Activación fallida detectada. Anulando cuenta de ${message.customerId}...`);
        account.status = 'CANCELLED';
        await account.save();
        
        this.kafkaClient.emit('billing.events', {
          eventId: crypto.randomUUID(),
          correlationId: message.correlationId,
          customerId: message.customerId,
          eventType: 'BillingAccountCancelled'
        });
      }
    }
  }
}
