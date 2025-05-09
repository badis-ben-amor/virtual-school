import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Subject {
  @Prop({ required: true })
  subject_name: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true })
  school_id: string;
}

export const SubjectSchema = SchemaFactory.createForClass(Subject);
