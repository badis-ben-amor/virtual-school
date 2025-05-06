import { PartialType } from '@nestjs/mapped-types';
import { SchoolCreateDto } from './school.create.dto';

export class SchoolUpdateDto extends PartialType(SchoolCreateDto) {}
