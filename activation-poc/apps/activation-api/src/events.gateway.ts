import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: true })
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // Método para enviar el evento al frontend de React
  broadcastEvent(eventData: any) {
    this.server.emit('activation_event', eventData);
  }
}