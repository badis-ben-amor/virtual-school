import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { ReqUserDto } from '../common/req.user.dto';
import { SchoolCreateDto } from './dto/school.create.dto';
import { SchoolUpdateDto } from './dto/school.update.dto';
import { SchoolParamsMongoIdDto } from './dto/school.params.mongoId.dto';

@UseGuards(AuthGuard)
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Post()
  create(@Body() schoolCreateDto: SchoolCreateDto, @Req() req: ReqUserDto) {
    return this.schoolService.create(schoolCreateDto, req);
  }

  @Get()
  getAll(@Req() req: ReqUserDto) {
    return this.schoolService.getAll(req);
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
  update(
    @Param() schoolParamsMongoIdDto: SchoolParamsMongoIdDto,
    @Body() schoolUpdateDto: SchoolUpdateDto,
    @Req() req: ReqUserDto,
  ) {
    const school_id = schoolParamsMongoIdDto.school_id;
    return this.schoolService.update(school_id, schoolUpdateDto, req);
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
