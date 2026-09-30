import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Observable, of } from 'rxjs';

@Injectable()
export class IdempotencyInterceptor implements NestInterceptor {
  async intercept(context: ExecutionContext, next: CallHandler): Promise<Observable<any>> {
    const data = context.switchToRpc().getData();
    const eventId = data.eventId;

    const alreadyProcessed = false; // Simulación a la consulta a la colección 'processed_events' en MongoDB

    if (alreadyProcessed) {
      console.warn(`Mensaje ${eventId} ignorado (Duplicado)`);
      return of(null); // Descarta el evento si ya se procesó
    }

    return next.handle();
  }
}