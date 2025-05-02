import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ClassRoom } from './classRoom.model';

@Module({
  imports: [SequelizeModule.forFeature([ClassRoom])],
  controllers: [],
  providers: [],
})
export class ClassRoomModule {}
