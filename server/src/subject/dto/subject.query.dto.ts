import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubjectQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  school_id: string;

  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsString()
  search_by_subject_name: string;

  @IsOptional()
  @IsString()
  sortByName: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  sortByDate: 'asc' | 'desc';
}
