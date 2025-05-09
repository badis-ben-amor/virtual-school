import { IsMongoId, IsNotEmpty } from 'class-validator';

export class StudentParamsDto {
  @IsMongoId()
  @IsNotEmpty()
  student_id: string;
}
