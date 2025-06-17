import { Transform, Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SubjectQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  school_id: string;

  @IsOptional()
  @Type(() => Number)
  @Transform(({ value }) => (value ? value : undefined))
  page: number;

  @IsOptional()
  @Transform(({ value }) => (value ? Math.min(value, 100) : undefined))
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === 'undefined' ? undefined : value))
  search_by_subject_name: string;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === 'undefined' ? undefined : value))
  sortByName: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === 'undefined' ? undefined : value))
  sortByDate: 'asc' | 'desc';
}
