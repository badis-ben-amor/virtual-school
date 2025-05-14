import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Classroom {
  @Prop({ required: true })
  classroom_name: string;

  @Prop()
  description: string;

  @Prop()
  room: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'School', required: true })
  school_id: string;
}

export const ClassroomSchema = SchemaFactory.createForClass(Classroom);
export type ClassroomDocument = HydratedDocument<Classroom>;
