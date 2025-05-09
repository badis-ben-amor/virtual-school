import { IsMongoId, IsNotEmpty } from 'class-validator';

export class StudentCreateDto {
  @IsNotEmpty()
  first_name: string;

  @IsNotEmpty()
  last_name: string;

  @IsMongoId()
  classroom_id: string;
}
