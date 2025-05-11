import { IsMongoId, IsNotEmpty } from 'class-validator';

export class StudentQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  school_id: string;
}
