import { Transform, Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ClassRoomQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  school_id: string;

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
  @IsString()
  @Transform(({ value }) => (value === 'undefined' ? undefined : value))
  sort_by_name: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  @Transform(({ value }) => (value === 'undefined' ? undefined : value))
  sort_by_date: 'asc' | 'desc';
}
