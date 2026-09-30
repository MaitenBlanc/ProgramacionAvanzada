import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: { clientId: 'activation-api', brokers: ['localhost:9092'] },
      consumer: { groupId: 'activation-api-group' },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3000);
  console.log('Activation API corriendo en http://localhost:3000');
}
bootstrap();
