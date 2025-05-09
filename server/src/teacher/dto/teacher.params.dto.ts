import { IsMongoId, IsNotEmpty } from 'class-validator';

export class TeacherParamsDto {
  @IsMongoId()
  @IsNotEmpty()
  teacher_id: string;
}
