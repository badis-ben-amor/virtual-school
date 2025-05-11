import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class School {
  @Prop({ required: true })
  school_name: string;

  @Prop()
  description: string;

  @Prop()
  address: string;

  @Prop()
  contact_email: string;

  @Prop()
  contact_phone: string;

  @Prop()
  logo_url: string;

  @Prop()
  website_url: string;

  @Prop({ default: false })
  is_active: boolean;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: string;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
export type SchoolDocument = HydratedDocument<School>;
