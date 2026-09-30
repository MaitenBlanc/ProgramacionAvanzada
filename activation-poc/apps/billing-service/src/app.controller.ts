import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, Payload } from '@nestjs/microservices';

@Controller()
export class AppController {
  // Escucha cuando se pide una activación
  @EventPattern('activation.requested')
  handleActivationRequested(@Payload() message: any) {
    console.log('Billing recibió ActivationRequested:', message);
    
    // Si la UI mandó a simular un fallo en billing
    if (message.payload?.simulateFailure === 'billing') {
      console.log(`Simulando fallo de facturación para ${message.customerId}`);
    } else {
      console.log(`Cuenta creada exitosamente para ${message.customerId}`);
    }
  }

  // Escucha el resultado final para compensar si es necesario
  @EventPattern('activation.events')
  handleActivationEvents(@Payload() message: any) {
    if (message.eventType === 'ActivationFailed') {
      console.log(`Activación fallida detectada. Anulando cuenta de ${message.customerId}...`);
    }
  }
}
