import { Type } from 'class-transformer';
import { IsMongoId, IsNotEmpty } from 'class-validator';

export class StudentQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  school_id: string;

  @Type(() => Number)
  @IsNotEmpty()
  page: number;

  @Type(() => Number)
  @IsNotEmpty()
  limit: number;
}
