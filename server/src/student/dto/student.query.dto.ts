import { IsMongoId, IsNotEmpty } from 'class-validator';

export class StudentQueryDto {
  @IsMongoId()
  @IsNotEmpty()
  classroom_id: string;
}
