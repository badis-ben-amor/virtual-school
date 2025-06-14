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
import { ClassRoomService } from './classRoom.service';
import { AuthGuard } from '../common/guards/auth.guard';
import { ClassRoomCreateDto } from './dto/classRoom.Create.dto';
import { ClassRoomQueryDto } from './dto/classRoom.query.dto';
import { ClassRoomParamsDto } from './dto/classRoom.params.dto';
import { ClassRoomUpdateDto } from './dto/classRoom.update.dto';

@UseGuards(AuthGuard)
@Controller('class-room')
export class ClassRoomController {
  constructor(private readonly classRoomService: ClassRoomService) {}

  @Post()
  create(@Body() classRoomCreateDto: ClassRoomCreateDto) {
    return this.classRoomService.create(classRoomCreateDto);
  }

  @Get()
  getAll(@Query() classRoomQueryDto: ClassRoomQueryDto) {
    return this.classRoomService.getAll(
      classRoomQueryDto.school_id,
      classRoomQueryDto.page,
      classRoomQueryDto.limit,
    );
  }

  @Get(':classroom_id')
  getOne(
    @Param() classRoomParamsDto: ClassRoomParamsDto,
    @Query() classRoomQueryDto: ClassRoomQueryDto,
  ) {
    return this.classRoomService.getOne(
      classRoomParamsDto.classroom_id,
      classRoomQueryDto.school_id,
    );
  }

  @Put(':classroom_id')
  update(
    @Param() classRoomParamsDto: ClassRoomParamsDto,
    @Query() classRoomQueryDto: ClassRoomQueryDto,
    @Body() classRoomUpdateDto: ClassRoomUpdateDto,
  ) {
    return this.classRoomService.update(
      classRoomParamsDto.classroom_id,
      classRoomQueryDto.school_id,
      classRoomUpdateDto,
    );
  }

  @Delete(':classroom_id')
  delete(
    @Param() classRoomParamsDto: ClassRoomParamsDto,
    @Query() classRoomQueryDto: ClassRoomQueryDto,
  ) {
    return this.classRoomService.delete(
      classRoomParamsDto.classroom_id,
      classRoomQueryDto.school_id,
    );
  }
}
