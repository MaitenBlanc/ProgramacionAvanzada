import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// Definir el tipo del documento hidratado para usarlo en el controlador
export type ActivationDocument = HydratedDocument<Activation>;

@Schema({ timestamps: true })
export class Activation {
  // Sobrescrir el _id explícitamente como String
  @Prop({ type: String, required: true }) 
  _id: string; 

  @Prop() 
  customerId: string;

  @Prop() 
  planId: string;

  @Prop() 
  status: string; 

  @Prop({ type: Object, default: null }) 
  billing: any;

  @Prop({ type: Object, default: null }) 
  provisioning: any;

  @Prop({ type: Array, default: [] }) 
  history: any[];
}

export const ActivationSchema = SchemaFactory.createForClass(Activation);