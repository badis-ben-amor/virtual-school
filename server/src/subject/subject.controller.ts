import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { SubjectService } from './subject.service';
import { SubjectCreateDto } from './dto/subject.create.dto';
import { SubjectQueryDto } from './dto/subject.query.dto';
import { SubjectParamsDto } from './dto/subject.params.dto';
import { SubjectUpdatedTO } from './dto/subject.update.dto';
import { AuthGuard } from '../common/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() subjectCreateDto: SubjectCreateDto) {
    return this.subjectService.create(subjectCreateDto);
  }

  @Get()
  getAll(@Query() subjectQueryDto: SubjectQueryDto) {
    return this.subjectService.getAll(
      subjectQueryDto.school_id,
      subjectQueryDto.page,
      subjectQueryDto.limit,
      subjectQueryDto.search_by_subject_name,
      subjectQueryDto.sortByName,
      subjectQueryDto.sortByDate,
    );
  }

  @Get(':subject_id')
  getOne(
    @Param() subjectParamsDto: SubjectParamsDto,
    @Query() subjectQueryDto: SubjectQueryDto,
  ) {
    return this.subjectService.getOne(
      subjectParamsDto.subject_id,
      subjectQueryDto.school_id,
    );
  }

  @Put(':subject_id')
  update(
    @Param() subjectParamsDto: SubjectParamsDto,
    @Query() subjectQueryDto: SubjectQueryDto,
    @Body() subjectUpdatedTO: SubjectUpdatedTO,
  ) {
    return this.subjectService.update(
      subjectParamsDto.subject_id,
      subjectQueryDto.school_id,
      subjectUpdatedTO,
    );
  }

  @Delete(':subject_id')
  delete(
    @Param() subjectParamsDto: SubjectParamsDto,
    @Query() subjectQueryDto: SubjectQueryDto,
  ) {
    return this.subjectService.delete(
      subjectParamsDto.subject_id,
      subjectQueryDto.school_id,
    );
  }
}
