import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ClassRoomQueryDto {
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
  search_by_name: string;

  @IsOptional()
  @IsString()
  sort_by_name: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  sort_by_date: 'asc' | 'desc';
}
