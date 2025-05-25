import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

@Schema()
export class Teacher {
  @Prop({ required: true })
  frst_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop()
  teacher_img_url: string;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Subject',
  })
  subjects: string[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Classroom',
  })
  classrooms: string[];

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true })
  school_id: string;
}

export const TeacherSchema = SchemaFactory.createForClass(Teacher);
