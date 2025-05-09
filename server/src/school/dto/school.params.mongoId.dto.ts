import { IsMongoId, IsOptional } from 'class-validator';

export class SchoolParamsMongoIdDto {
  @IsOptional()
  @IsMongoId()
  school_id: string;
}
