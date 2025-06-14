import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

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
}
