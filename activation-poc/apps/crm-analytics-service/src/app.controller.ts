import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  // Escucha TODOS los topics de la POC para registrar la analítica global
  @EventPattern('activation.requested')
  handleReq(@Payload() msg: any) { console.log('[CRM] Guardando ActivationRequested:', msg.correlationId); }

  @EventPattern('billing.events')
  handleBil(@Payload() msg: any) { console.log('[CRM] Guardando evento de Billing:', msg.eventType); }

  @EventPattern('provisioning.events')
  handleProv(@Payload() msg: any) { console.log('[CRM] Guardando evento de Provisioning:', msg.eventType); }

  @EventPattern('activation.events')
  handleAct(@Payload() msg: any) { console.log('[CRM] Guardando evento final de Activación:', msg.eventType); }
}