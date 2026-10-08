import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type OutboxEventDocument = OutboxEvent & Document;

@Schema({ timestamps: true })
export class OutboxEvent {
  @Prop({ required: true })
  topic: string;

  @Prop({ type: Object, required: true })
  payload: any;

  @Prop({ required: true, default: 'PENDING' })
  status: 'PENDING' | 'PUBLISHED';
}

export const OutboxEventSchema = SchemaFactory.createForClass(OutboxEvent);

