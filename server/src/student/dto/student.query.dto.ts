import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class StudentQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  school_id: string;

  @Type(() => Number)
  @IsOptional()
  page?: number;

  @Type(() => Number)
  @IsOptional()
  limit?: number;

  @IsString()
  @IsOptional()
  first_name_search?: string;

  @IsString()
  @IsOptional()
  last_name_search?: string;

  @IsString()
  @IsOptional()
  sortByDate?: 'asc' | 'desc';

  @IsString()
  @IsOptional()
  sortByName?: 'asc' | 'desc';

  @IsOptional()
  @IsString()
  classroom_id?: string;
}
