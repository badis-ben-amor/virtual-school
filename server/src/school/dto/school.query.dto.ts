import { Transform, Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class SchoolQueryDto {
  @IsOptional()
  @Transform(({ value }) => (value ? value : undefined))
  @Type(() => Number)
  page: number;

  @IsOptional()
  @Transform(({ value }) => (value ? Math.min(value, 100) : undefined))
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === 'undefined' ? undefined : value))
  search_by_name: string;

  @IsOptional()
  @Transform(({ value }) => (value === 'undefined' ? undefined : value))
  @IsString()
  sort_by_name: 'asc' | 'desc';

  @IsOptional()
  @Transform(({ value }) => (value === 'undefined' ? undefined : value))
  @IsString()
  sort_by_date: 'asc' | 'desc';
}
