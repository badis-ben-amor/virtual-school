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
import { TeacherService } from './teacher.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { TeacherCreateDto } from './dto/teacher.create.dto';
import { TeacherQueryDto } from './dto/teacher.query.dto';
import { TeacherParamsDto } from './dto/teacher.params.dto';
import { TeacherUpdateDto } from './dto/teacher.update.dto';

@UseGuards(AuthGuard)
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  create(@Body() teacherCreateDto: TeacherCreateDto) {
    return this.teacherService.create(teacherCreateDto);
  }

  @Get()
  getAll(@Query() teacherQueryDto: TeacherQueryDto) {
    return this.teacherService.getAll(teacherQueryDto.school_id);
  }

  @Get(':teacher_id')
  getOne(
    @Query() teacherQueryDto: TeacherQueryDto,
    @Param() teacherParamsDto: TeacherParamsDto,
  ) {
    return this.teacherService.getOne(
      teacherParamsDto.teacher_id,
      teacherQueryDto.school_id,
    );
  }

  @Put(':teacher_id')
  update(
    @Param() teacherParamsDto: TeacherParamsDto,
    @Query() teacherQueryDto: TeacherQueryDto,
    @Body() teacherUpdateDto: TeacherUpdateDto,
  ) {
    return this.teacherService.update(
      teacherParamsDto.teacher_id,
      teacherQueryDto.school_id,
      teacherUpdateDto,
    );
  }

  @Delete(':teacher_id')
  delete(
    @Query() teacherQueryDto: TeacherQueryDto,
    @Param() teacherParamsDto: TeacherParamsDto,
  ) {
    return this.teacherService.delete(
      teacherParamsDto.teacher_id,
      teacherQueryDto.school_id,
    );
  }
}
