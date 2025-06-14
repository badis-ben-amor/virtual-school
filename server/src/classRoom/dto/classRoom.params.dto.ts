import { IsMongoId, IsOptional } from 'class-validator';

export class ClassRoomParamsDto {
  @IsOptional()
  @IsMongoId()
  classroom_id: string;
}
