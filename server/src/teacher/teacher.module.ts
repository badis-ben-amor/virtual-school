import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeacherSchema } from './teacher.schema';
import { SchoolSchema } from '../school/school.schema';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { CloudinaryModule } from '../common/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Teacher', schema: TeacherSchema },
      { name: 'School', schema: SchoolSchema },
    ]),
    CloudinaryModule,
  ],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
