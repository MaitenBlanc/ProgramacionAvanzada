import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type NotificationDocument = NotificationLog & Document;

@Schema({ timestamps: { createdAt: true, updatedAt: false } })
export class NotificationLog {
  @Prop({ required: true, unique: true })
  _id: string; // activationId + eventType
  
  @Prop({ required: true })
  activationId: string;

  @Prop({ required: true })
  eventType: string;
}

export const NotificationSchema = SchemaFactory.createForClass(NotificationLog);
