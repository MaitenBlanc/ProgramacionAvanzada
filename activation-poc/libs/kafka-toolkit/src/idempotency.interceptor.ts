import { CallHandler, ExecutionContext, Injectable, NestInterceptor, Inject } from '@nestjs/common';
import { Observable, of, throwError, timer } from 'rxjs';
import { catchError, retryWhen, mergeMap } from 'rxjs/operators';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { ClientKafka } from '@nestjs/microservices';
import { ProcessedEventDocument } from './processed-event.schema';

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  constructor(
    @Inject(getModelToken('ProcessedEvent'))
    private processedEventModel: Model<ProcessedEventDocument>,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const rpcContext = context.switchToRpc();
    const data = rpcContext.getData();
    const kafkaContext = rpcContext.getContext();
    const topic = kafkaContext.getTopic();
    const eventId = data.eventId;

    if (!eventId) {
      return next.handle();
    }

    try {
      await this.processedEventModel.create({ _id: eventId, createdAt: new Date() });
    } catch (error: any) {
      if (error.code === 11000) { // Duplicate key
        console.warn(`Mensaje ${eventId} ignorado (Duplicado)`);
        return of(null);
      }
      throw error;
    }

    return next.handle().pipe(
      retryWhen(errors =>
        errors.pipe(
          mergeMap((error, index) => {
            const retryAttempt = index + 1;
            if (retryAttempt === 1) return timer(1000);
            if (retryAttempt === 2) return timer(2000);
            if (retryAttempt === 3) return timer(4000);
            
            // Excedió reintentos
            console.error(`Mensaje ${eventId} falló 3 veces. Enviando a DLQ...`);
            this.kafkaClient.emit(`${topic}.dlq`, {
              ...data,
              errorReason: error.message
            });
            return of(null); // Continúa procesando
          })
        )
      )
    );
  }
}
