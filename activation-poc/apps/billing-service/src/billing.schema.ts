import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BillingAccountDocument = BillingAccount & Document;

@Schema({ timestamps: true })
export class BillingAccount {
  @Prop({ required: true, unique: true })
  _id: string; // activationId único
  
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  status: 'CREATED' | 'CANCELLED';
}

export const BillingAccountSchema = SchemaFactory.createForClass(BillingAccount);
