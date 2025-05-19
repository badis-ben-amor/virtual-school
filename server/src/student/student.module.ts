import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './student.schema';
import { ClassroomSchema } from '../classRoom/classRoom.schema';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CloudinaryModule } from '../common/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Student', schema: StudentSchema },
      { name: 'Classroom', schema: ClassroomSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
