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
  subjects: string[];

  @IsMongoId({ each: true })
  @IsArray()
  @IsOptional()
  classrooms: string[];

  @IsMongoId()
  @IsNotEmpty()
  school_id: string;
}
