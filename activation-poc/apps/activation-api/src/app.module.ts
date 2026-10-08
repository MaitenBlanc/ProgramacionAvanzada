import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { EventsGateway } from './events.gateway';
import { Activation, ActivationSchema } from './activation.schema';
import { OutboxEvent, OutboxEventSchema } from './outbox.schema';
import { ProcessedEvent, ProcessedEventSchema } from 'kafka-toolkit';
import { ScheduleModule } from '@nestjs/schedule';
import { OutboxProcessor } from './outbox.processor';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/activation_db?directConnection=true';
const brokers = process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : ['localhost:9092'];

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(mongoUri),
    MongooseModule.forFeature([
      { name: Activation.name, schema: ActivationSchema },
      { name: OutboxEvent.name, schema: OutboxEventSchema },
      { name: ProcessedEvent.name, schema: ProcessedEventSchema }
    ]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: { clientId: 'activation-api', brokers: brokers },
          consumer: { groupId: 'activation-api-group' },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [EventsGateway, OutboxProcessor],
})
export class AppModule {}
