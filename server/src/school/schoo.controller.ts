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
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { ReqUserDto } from '../common/req.user.dto';
import { SchoolCreateDto } from './dto/school.create.dto';
import { SchoolUpdateDto } from './dto/school.update.dto';
import { SchoolParamsMongoIdDto } from './dto/school.params.mongoId.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@UseGuards(AuthGuard)
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  @UseInterceptors(FileInterceptor('school_img'))
  create(
    @Body() schoolCreateDto: SchoolCreateDto,
    @Req() req: ReqUserDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          // new FileTypeValidator({ fileType: 'image/*' }),   // that not work on vercel but locally worked
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.schoolService.create(schoolCreateDto, req, file);
  }

  @Get()
  getAll(@Req() req: ReqUserDto) {
    return this.schoolService.getAll(req);
  }

  @Get('active-school')
  getActiveSchool(@Req() req: ReqUserDto) {
    return this.schoolService.getActiveSchool(req);
  }

  @Get(':school_id')
  getOne(
    @Param() schoolParamsMongoIdDto: SchoolParamsMongoIdDto,
    @Req() req: ReqUserDto,
  ) {
    const school_id = schoolParamsMongoIdDto.school_id;
    return this.schoolService.getOne(school_id, req);
  }

  @Put(':school_id')
  @UseInterceptors(FileInterceptor('school_img'))
  update(
    @Param() schoolParamsMongoIdDto: SchoolParamsMongoIdDto,
    @Body() schoolUpdateDto: SchoolUpdateDto,
    @Req() req: ReqUserDto,
    @UploadedFile(
      new ParseFilePipe({
        fileIsRequired: false,
        validators: [
          // new FileTypeValidator({ fileType: 'image/*' }),
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    const school_id = schoolParamsMongoIdDto.school_id;
    return this.schoolService.update(school_id, schoolUpdateDto, req, file);
  }

  @Delete(':school_id')
  deleteSchool(
    @Param() schoolParamsMongoIdDto: SchoolParamsMongoIdDto,
    @Req() req: ReqUserDto,
  ) {
    const school_id = schoolParamsMongoIdDto.school_id;
    return this.schoolService.deleteSchool(school_id, req);
  }
}
