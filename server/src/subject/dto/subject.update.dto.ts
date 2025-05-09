import { PartialType } from '@nestjs/mapped-types';
import { SubjectCreateDto } from './subject.create.dto';

export class SubjectUpdatedTO extends PartialType(SubjectCreateDto) {}
