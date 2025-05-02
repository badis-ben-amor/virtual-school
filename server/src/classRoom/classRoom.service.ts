import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectModel } from '@nestjs/sequelize';
import { ClassRoom } from './classRoom.model';

@Injectable()
export class ClassRoomService {
  constructor(
    @InjectModel(ClassRoom)
    private readonly ClassRoomRepository: typeof ClassRoom,
  ) {}
}
