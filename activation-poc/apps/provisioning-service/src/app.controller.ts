import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  @EventPattern('activation.requested')
  async handleActivationRequested(@Payload() message: any) {
    console.log('Provisioning procesando...', message.customerId);
    
    // Simula un retardo de aprovisionamiento de 2 segundos
    await new Promise(resolve => setTimeout(resolve, 2000));

    if (message.payload?.simulateFailure === 'provisioning') {
      console.log(`Fallo simulado en provisioning para ${message.customerId}`);
    } else {
      console.log(`Línea aprovisionada para ${message.customerId}`);
    }
  }
}
