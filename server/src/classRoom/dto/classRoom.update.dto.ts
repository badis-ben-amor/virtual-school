import { PartialType } from '@nestjs/mapped-types';
import { ClassRoomCreateDto } from './classRoom.Create.dto';

export class ClassRoomUpdateDto extends PartialType(ClassRoomCreateDto) {}
