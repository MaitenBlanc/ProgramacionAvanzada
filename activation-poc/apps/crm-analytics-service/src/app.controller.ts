import { Controller, UseInterceptors } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { EventLog, EventLogDocument } from './event.schema';
import { IdempotencyInterceptor } from 'kafka-toolkit';

@Controller()
export class AppController {
  constructor(
    @InjectModel(EventLog.name) private eventLogModel: Model<EventLogDocument>,
  ) {}

  @UseInterceptors(IdempotencyInterceptor)
  @EventPattern('activation.requested')
  async handleReq(@Payload() msg: any) { 
    console.log('[CRM] Guardando ActivationRequested:', msg.correlationId); 
    await this.saveEvent(msg);
  }

  @UseInterceptors(IdempotencyInterceptor)
  @EventPattern('billing.events')
  async handleBil(@Payload() msg: any) { 
    console.log('[CRM] Guardando evento de Billing:', msg.eventType); 
    await this.saveEvent(msg);
  }

  @UseInterceptors(IdempotencyInterceptor)
  @EventPattern('provisioning.events')
  async handleProv(@Payload() msg: any) { 
    console.log('[CRM] Guardando evento de Provisioning:', msg.eventType); 
    await this.saveEvent(msg);
  }

  @UseInterceptors(IdempotencyInterceptor)
  @EventPattern('activation.events')
  async handleAct(@Payload() msg: any) { 
    console.log('[CRM] Guardando evento final de Activación:', msg.eventType); 
    await this.saveEvent(msg);
  }

  private async saveEvent(msg: any) {
    if (!msg.eventId) return;
    try {
      await this.eventLogModel.create({
        _id: msg.eventId,
        correlationId: msg.correlationId,
        payload: msg
      });
    } catch (e: any) {
      if (e.code !== 11000) throw e;
    }
  }
}
