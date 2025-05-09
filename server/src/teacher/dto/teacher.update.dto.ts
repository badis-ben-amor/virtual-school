import { PartialType } from '@nestjs/mapped-types';
import { TeacherCreateDto } from './teacher.create.dto';

export class TeacherUpdateDto extends PartialType(TeacherCreateDto) {}
