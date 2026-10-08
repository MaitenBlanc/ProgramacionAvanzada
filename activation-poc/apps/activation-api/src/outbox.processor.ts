import { Injectable, Inject, Logger } from '@nestjs/common';
import { Interval } from '@nestjs/schedule';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OutboxEvent, OutboxEventDocument } from './outbox.schema';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class OutboxProcessor {
  private readonly logger = new Logger(OutboxProcessor.name);

  constructor(
    @InjectModel(OutboxEvent.name) private outboxModel: Model<OutboxEventDocument>,
    @Inject('KAFKA_SERVICE') private readonly kafkaClient: ClientKafka,
  ) {}

  @Interval(500) // Runs every 500ms
  async processOutbox() {
    // Find up to 100 pending events, oldest first
    const pendingEvents = await this.outboxModel
      .find({ status: 'PENDING' })
      .sort({ createdAt: 1 })
      .limit(100)
      .exec();

    if (pendingEvents.length > 0) {
      this.logger.debug(`Found ${pendingEvents.length} pending events to publish.`);
    }

    for (const event of pendingEvents) {
      try {
        // Emit to Kafka
        this.kafkaClient.emit(event.topic, event.payload);
        
        // Mark as published
        event.status = 'PUBLISHED';
        await event.save();
        
        this.logger.debug(`Published event ${event._id} to topic ${event.topic}`);
      } catch (error) {
        this.logger.error(`Failed to publish event ${event._id}:`, error);
        // We do not break the loop to allow other events to be processed.
      }
    }
  }
}
