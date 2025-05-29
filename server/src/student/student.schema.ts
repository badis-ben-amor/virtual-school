import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop()
  student_img_url: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Classroom',
  })
  classroom_id: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School' })
  school_id: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
