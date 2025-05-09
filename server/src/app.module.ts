import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { SchoolModule } from './school/school.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ClassRoomModule } from './classRoom/classRoom.module';
import { StudentModule } from './student/student.module';
import { SubjectModule } from './subject/subject.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    JwtModule.register({ global: true }),
    MongooseModule.forRoot(process.env.MONGO_URL!),
    AuthModule,
    UserModule,
    SchoolModule,
    ClassRoomModule,
    StudentModule,
    SubjectModule,
    TeacherModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
