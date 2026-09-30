import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
 const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'notification',
        brokers: ['localhost:9092'], // En docker: 'kafka:9092'
      },
      consumer: {
        groupId: 'notification-consumer-group',
      },
    },
  });
  await app.listen();
  console.log('Notification Service conectado a Kafka');
}
bootstrap();
