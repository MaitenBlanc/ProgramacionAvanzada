import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  @Post()
  @HttpCode(HttpStatus.ACCEPTED) // RF-02: Responde 202 Accepted
  createActivation(@Body() body: any) {
    const eventId = crypto.randomUUID();
    const correlationId = `act-${Date.now()}`;
    
    const event = {
      eventId,
      eventType: 'ActivationRequested',
      correlationId,
      customerId: body.customerId || 'C-1234',
      payload: {
        planId: body.planId || 'FLOW-FULL',
        simulateFailure: body.simulateFailure || 'none'
      }
    };

    // Publica el evento inicial en Kafka
    this.kafkaClient.emit('activation.requested', event);
    
    return { activationId: correlationId, status: 'PENDING' };
  }
}
