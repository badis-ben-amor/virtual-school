import { Transform } from 'class-transformer';
import {
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class TeacherCreateDto {
  @IsString()
  @IsNotEmpty()
  frst_name: string;

  @IsString()
  @IsNotEmpty()
  last_name: string;

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  subjects: string[];

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  @Transform(({ value }) => JSON.parse(value))
  classrooms: string[];

  @IsMongoId()
  @IsNotEmpty()
  school_id: string;
}
