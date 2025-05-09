import { PartialType } from '@nestjs/mapped-types';
import { StudentCreateDto } from './student.create.dto';

export class StudentUpdateDto extends PartialType(StudentCreateDto) {}
