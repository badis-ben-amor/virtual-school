import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentSchema } from './student.schema';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';
import { CloudinaryModule } from '../common/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Student', schema: StudentSchema }]),
    CloudinaryModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
