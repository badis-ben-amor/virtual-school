import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class TeacherQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  school_id: string;

  @Type(() => Number)
  @IsOptional()
  page: number;

  @Type(() => Number)
  @IsOptional()
  limit: number;

  @IsOptional()
  @IsString()
  first_name_search: string;

  @IsOptional()
  @IsString()
  last_name_search: string;

  @IsOptional()
  @IsString()
  sortByName: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  sortByDate: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  classroom_id: string;

  @IsOptional()
  @IsString()
  subject_id: string;
}
