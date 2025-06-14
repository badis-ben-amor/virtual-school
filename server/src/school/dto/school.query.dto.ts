import { Type } from 'class-transformer';
import { IsOptional, IsString } from 'class-validator';

export class SchoolQueryDto {
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @Type(() => Number)
  limit: number;

  @IsOptional()
  @IsString()
  search_by_name: string;

  @IsOptional()
  @IsString()
  sort_by_name: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  sort_by_date: 'asc' | 'desc';
}
