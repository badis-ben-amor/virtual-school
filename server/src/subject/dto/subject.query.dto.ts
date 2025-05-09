import { IsMongoId, IsNotEmpty } from 'class-validator';

export class SubjectQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  school_id: string;
}
