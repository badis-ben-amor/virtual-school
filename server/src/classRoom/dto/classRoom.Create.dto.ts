import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class ClassRoomCreateDto {
  @IsNotEmpty()
  @IsString()
  classroom_name: string;

  @IsString()
  description: string;

  @IsMongoId()
  school_id: Types.ObjectId;
}
