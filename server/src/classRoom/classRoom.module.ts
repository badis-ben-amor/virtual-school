import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { classRoom } from './classRoom.model';

@Module({
  imports: [SequelizeModule.forFeature([classRoom])],
  controllers: [],
  providers: [],
})
export class classRoomModule {}
