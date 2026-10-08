import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type EventLogDocument = EventLog & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class EventLog {
  @Prop({ required: true, unique: true })
  _id: string; // eventId
  
  @Prop({ required: true })
  correlationId: string;

  @Prop({ type: Object, required: true })
  payload: any;
}

export const EventLogSchema = SchemaFactory.createForClass(EventLog);
