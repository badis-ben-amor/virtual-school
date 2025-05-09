import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema()
export class Student {
  @Prop({ required: true })
  first_name: string;

  @Prop({ required: true })
  last_name: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClassRoom',
    required: true,
  })
  classroom_id: string;
}

export const StudentSchema = SchemaFactory.createForClass(Student);
export type StudentSchemaDocument = HydratedDocument<Student>;
