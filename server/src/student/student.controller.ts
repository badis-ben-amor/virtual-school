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
import { StudentService } from './student.service';
import { StudentCreateDto } from './dto/student.create.dto';
import { AuthGuard } from '../common/guards/auth.guard';
import { StudentQueryDto } from './dto/student.query.dto';
import { StudentParamsDto } from './dto/student.params.dto';
import { StudentUpdateDto } from './dto/update.student.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('student')
export class StudentController {
  constructor(private readonly StudentService: StudentService) {}

  @Post()
  @UseInterceptors(FileInterceptor('student_img'))
  create(
    @Body() studentCreateDto: StudentCreateDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.StudentService.create(studentCreateDto, file);
  }

  @Get()
  getAll(@Query() studentQueryDto: StudentQueryDto) {
    return this.StudentService.getAll(
      studentQueryDto.school_id,
      studentQueryDto.page,
      studentQueryDto.limit,
      studentQueryDto.first_name_search,
      studentQueryDto.last_name_search,
      studentQueryDto.sortByDate,
      studentQueryDto.sortByName,
      studentQueryDto.classroom_id,
    );
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
  @UseInterceptors(FileInterceptor('student_img'))
  update(
    @Param() studentParamsDto: StudentParamsDto,
    @Query() studentQueryDto: StudentQueryDto,
    @Body() studentUpdateDto: StudentUpdateDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 })],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.StudentService.update(
      studentParamsDto.student_id,
      studentQueryDto.school_id,
      studentUpdateDto,
      file,
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
