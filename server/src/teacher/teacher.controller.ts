import {
  Body,
  Controller,
  Delete,
  Get,
  MaxFileSizeValidator,
  Param,
  ParseFilePipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TeacherService } from './teacher.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { TeacherCreateDto } from './dto/teacher.create.dto';
import { TeacherQueryDto } from './dto/teacher.query.dto';
import { TeacherParamsDto } from './dto/teacher.params.dto';
import { TeacherUpdateDto } from './dto/teacher.update.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('teacher')
export class TeacherController {
  constructor(private readonly teacherService: TeacherService) {}

  @Post()
  @UseInterceptors(FileInterceptor('teacher_img'))
  create(
    @Body() teacherCreateDto: TeacherCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.teacherService.create(teacherCreateDto, file);
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
  @UseInterceptors(FileInterceptor('teacher_img'))
  update(
    @Param() teacherParamsDto: TeacherParamsDto,
    @Query() teacherQueryDto: TeacherQueryDto,
    @Body() teacherUpdateDto: TeacherUpdateDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.teacherService.update(
      teacherParamsDto.teacher_id,
      teacherQueryDto.school_id,
      teacherUpdateDto,
      file,
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
