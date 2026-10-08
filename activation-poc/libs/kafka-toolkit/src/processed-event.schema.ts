import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProcessedEventDocument = ProcessedEvent & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class ProcessedEvent {
  @Prop({ required: true, unique: true })
  _id: string; // eventId

  @Prop({ required: true, expires: '7d' })
  createdAt: Date; // Para TTL de 7 dias (coincide con retencion de topics)
}

export const ProcessedEventSchema = SchemaFactory.createForClass(ProcessedEvent);
