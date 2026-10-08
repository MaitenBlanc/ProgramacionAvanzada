import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProvisioningOrderDocument = ProvisioningOrder & Document;

@Schema({ timestamps: true })
export class ProvisioningOrder {
  @Prop({ required: true, unique: true })
  _id: string; // activationId
  
  @Prop({ required: true })
  customerId: string;

  @Prop({ required: true })
  status: 'COMPLETED' | 'CANCELLED';
}

export const ProvisioningOrderSchema = SchemaFactory.createForClass(ProvisioningOrder);
