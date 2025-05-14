import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ClassRoomCreateDto {
  @IsString()
  @IsNotEmpty()
  classroom_name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  room: string;

  @IsMongoId()
  @IsNotEmpty()
  school_id: string;
}
