import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { SchoolService } from './school.service';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@Controller('school')
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @Get()
  getOne(@Req() req: any) {
    return this.schoolService.getOne(req.user.id);
  }

  @Post()
  create(@Body() schoolData: any, @Req() req) {
    return this.schoolService.create(schoolData, req.user.id);
  }

  @Put()
  update(@Body() schoolData: any, @Req() req: any) {
    return this.schoolService.update(schoolData, req.user.id);
  }

  @Delete()
  deleteSchool(@Req() req: any) {
    console.log(req.body);
    return this.schoolService.deleteSchool(req.user.id);
  }
}
