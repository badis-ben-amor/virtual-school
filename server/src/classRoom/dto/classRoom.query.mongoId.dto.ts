import { IsMongoId, IsNotEmpty } from 'class-validator';

export class ClassRoomQueryMongoIdDto {
  @IsMongoId()
  @IsNotEmpty()
  school_id: string;
}
