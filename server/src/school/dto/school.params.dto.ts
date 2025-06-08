import { IsMongoId, IsOptional } from 'class-validator';

export class SchoolParamsDto {
  @IsOptional()
  @IsMongoId()
  school_id: string;
}
