import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProcessedEvent, ProcessedEventSchema } from 'kafka-toolkit';
import { NotificationLog, NotificationSchema } from './notification.schema';

const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/notification_db?directConnection=true';
const brokers = process.env.KAFKA_BROKERS ? process.env.KAFKA_BROKERS.split(',') : ['localhost:9092'];

@Module({
  imports: [
    MongooseModule.forRoot(mongoUri),
    MongooseModule.forFeature([
      { name: NotificationLog.name, schema: NotificationSchema },
      { name: ProcessedEvent.name, schema: ProcessedEventSchema }
    ]),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: { clientId: 'notification-service', brokers: brokers },
          consumer: { groupId: 'notification-svc' },
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
