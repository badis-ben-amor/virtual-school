import { IsMongoId, IsOptional } from 'class-validator';

export class ClassRoomQueryMongoIdDto {
  @IsOptional()
  @IsMongoId()
  school_id: string;
}
