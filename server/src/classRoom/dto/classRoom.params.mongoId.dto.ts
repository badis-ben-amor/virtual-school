import { IsMongoId, IsOptional } from 'class-validator';

export class ClassRoomParamsMongoIdDto {
  @IsOptional()
  @IsMongoId()
  classroom_id: string;
}
