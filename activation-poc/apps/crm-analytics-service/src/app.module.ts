import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessedEvent, ProcessedEventSchema } from 'kafka-toolkit';
import { EventLog, EventLogSchema } from './event.schema';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/crm_db?directConnection=true';
const brokers = process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : ['localhost:9092'];

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    MongooseModule.forFeature([
      { name: EventLog.name, schema: EventLogSchema },
      { name: ProcessedEvent.name, schema: ProcessedEventSchema }
    ]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: { clientId: 'crm-analytics-service', brokers: brokers },
          consumer: { groupId: 'crm-analytics' },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
