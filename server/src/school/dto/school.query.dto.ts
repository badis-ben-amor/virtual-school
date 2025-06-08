import { Type } from 'class-transformer';
import { IsOptional } from 'class-validator';

export class SchoolQueryDto {
  @IsOptional()
  @Type(() => Number)
  page: number;

  @IsOptional()
  @Type(() => Number)
  limit: number;
}
