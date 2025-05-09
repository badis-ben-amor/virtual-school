import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SubjectParamsDto {
  @IsMongoId()
  @IsNotEmpty()
  subject_id: string;
}
