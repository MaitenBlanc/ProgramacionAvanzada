import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'crm-analytics',
          brokers: process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : ['localhost:9092'], // En docker: 'kafka:9092'
        },
        consumer: {
          groupId: 'crm-analytics-group',
        },
      },
    });
    await app.listen();
    console.log('CRM Analytics Service conectado a Kafka');
  }
bootstrap();
