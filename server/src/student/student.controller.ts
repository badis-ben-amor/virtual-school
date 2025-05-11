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
import { StudentService } from './student.service';
import { StudentCreateDto } from './dto/student.create.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { StudentQueryDto } from './dto/student.query.dto';
import { StudentParamsDto } from './dto/student.params.dto';
import { StudentUpdateDto } from './dto/update.student.dto';

@UseGuards(AuthGuard)
@Controller('student')
export class StudentController {
  constructor(private readonly StudentService: StudentService) {}

  @Post()
  create(@Body() studentCreateDto: StudentCreateDto) {
    return this.StudentService.create(studentCreateDto);
  }

  @Get()
  getAll(@Query() studentQueryDto: StudentQueryDto) {
    return this.StudentService.getAll(studentQueryDto.school_id);
  }

  @Get(':student_id')
  getOne(
    @Param() studentParamsDto: StudentParamsDto,
    @Query() studentQueryDto: StudentQueryDto,
  ) {
    return this.StudentService.getOne(
      studentParamsDto.student_id,
      studentQueryDto.school_id,
    );
  }

  @Put(':student_id')
  update(
    @Param() studentParamsDto: StudentParamsDto,
    @Query() studentQueryDto: StudentQueryDto,
    @Body() studentUpdateDto: StudentUpdateDto,
  ) {
    return this.StudentService.update(
      studentParamsDto.student_id,
      studentQueryDto.school_id,
      studentUpdateDto,
    );
  }

  @Delete(':student_id')
  delete(
    @Param() studentParamsDto: StudentParamsDto,
    @Query() studentQueryDto: StudentQueryDto,
  ) {
    return this.StudentService.delete(
      studentParamsDto.student_id,
      studentQueryDto.school_id,
    );
  }
}
