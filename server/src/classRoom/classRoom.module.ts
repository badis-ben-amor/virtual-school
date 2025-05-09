import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassroomSchema } from './classRoom.schema';
import { ClassRoomService } from './classRoom.service';
import { ClassRoomController } from './classRoom.controller';
import { UserSchema } from '../user/user.schema';
import { SchoolSchema } from '../school/school.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Classroom', schema: ClassroomSchema },
      { name: 'User', schema: UserSchema },
      { name: 'School', schema: SchoolSchema },
    ]),
  ],
  controllers: [ClassRoomController],
  providers: [ClassRoomService],
})
export class ClassRoomModule {}
