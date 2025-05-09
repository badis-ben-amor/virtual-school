import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class SubjectCreateDto {
  @IsString()
  @IsNotEmpty()
  subject_name: string;

  @IsMongoId()
  @IsNotEmpty()
  school_id: string;
}
