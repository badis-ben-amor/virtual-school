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
import { AuthGuard } from '../guards/auth.guard';
import { ReqUserDto } from '../common/req.user.dto';
import { SchoolCreateDto } from './dto/school.create.dto';
import { SchoolUpdateDto } from './dto/school.update.dto';

@UseGuards(AuthGuard)
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  getAll(@Req() req: ReqUserDto) {
    return this.schoolService.getAll(req);
  }

  @Get(':school_id')
  getOne(@Param('school_id') school_id: any, @Req() req: ReqUserDto) {
    return this.schoolService.getOne(school_id, req);
  }

  @Post()
  create(@Body() schoolCreateDto: SchoolCreateDto, @Req() req: ReqUserDto) {
    return this.schoolService.create(schoolCreateDto, req);
  }

  @Put()
  update(@Body() schoolUpdateDto: SchoolUpdateDto, @Req() req: ReqUserDto) {
    return this.schoolService.update(schoolUpdateDto, req);
  }

  @Delete()
  deleteSchool(@Req() req: ReqUserDto) {
    return this.schoolService.deleteSchool(req);
  }
}
