import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  @EventPattern('activation.events')
  handleActivationEvents(@Payload() message: any) {
    if (message.eventType === 'ActivationCompleted') {
      console.log(`[Mailhog] Enviando Email de BIENVENIDA a ${message.customerId}`);
    } else if (message.eventType === 'ActivationFailed') {
      console.log(`[Mailhog] Enviando Email de DISCULPAS (Error) a ${message.customerId}`);
    }
  }
}
