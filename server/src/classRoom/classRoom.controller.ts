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
import { ClassRoomQueryMongoIdDto } from './dto/classRoom.query.mongoId.dto';
import { ClassRoomParamsMongoIdDto } from './dto/classRoom.params.mongoId.dto';
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
  getAll(@Query() classRoomQueryMongoIdDto: ClassRoomQueryMongoIdDto) {
    const school_id = classRoomQueryMongoIdDto.school_id;

    return this.classRoomService.getAll(school_id);
  }

  @Get(':classroom_id')
  getOne(
    @Param() classRoomParamsMongoIdDto: ClassRoomParamsMongoIdDto,
    @Query() classRoomQueryMongoIdDto: ClassRoomQueryMongoIdDto,
  ) {
    const classroom_id = classRoomParamsMongoIdDto.classroom_id,
      school_id = classRoomQueryMongoIdDto.school_id;

    return this.classRoomService.getOne(classroom_id, school_id);
  }

  @Put(':classroom_id')
  update(
    @Param() classRoomParamsMongoIdDto: ClassRoomParamsMongoIdDto,
    @Query() classRoomQueryMongoIdDto: ClassRoomQueryMongoIdDto,
    @Body() classRoomUpdateDto: ClassRoomUpdateDto,
  ) {
    const classroom_id = classRoomParamsMongoIdDto.classroom_id,
      school_id = classRoomQueryMongoIdDto.school_id;

    return this.classRoomService.update(
      classroom_id,
      school_id,
      classRoomUpdateDto,
    );
  }

  @Delete(':classroom_id')
  delete(
    @Param() classRoomParamsMongoIdDto: ClassRoomParamsMongoIdDto,
    @Query() classRoomQueryMongoIdDto: ClassRoomQueryMongoIdDto,
  ) {
    const classroom_id = classRoomParamsMongoIdDto.classroom_id,
      school_id = classRoomQueryMongoIdDto.school_id;

    return this.classRoomService.delete(classroom_id, school_id);
  }
}
