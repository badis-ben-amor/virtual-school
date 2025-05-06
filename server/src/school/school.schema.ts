import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument, Types } from 'mongoose';

@Schema({ timestamps: true })
export class School {
  @Prop({ type: String, required: true })
  school_name: string;

  @Prop({ type: String })
  description: string;

  @Prop({ type: String })
  address: string;

  @Prop({ type: String })
  contact_email: string;

  @Prop({ type: String })
  contact_phone: string;

  @Prop({ type: String })
  logo_url: string;

  @Prop({ type: String })
  website_url: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  user_id: Types.ObjectId;
}

export const SchoolSchema = SchemaFactory.createForClass(School);
export type SchoolDocument = HydratedDocument<School>;
