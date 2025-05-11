import { IsMongoId, IsNotEmpty, IsOptional } from 'class-validator';

export class StudentCreateDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsMongoId()
  @IsOptional()
  classroom_id: string;

  @IsMongoId()
  @IsNotEmpty()
  school_id: string;
}
