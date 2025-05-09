import { IsMongoId, IsNotEmpty } from 'class-validator';

export class TeacherQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  school_id: string;
}
