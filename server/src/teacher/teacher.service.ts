import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from './teacher.schema';
import { TeacherCreateDto } from './dto/teacher.create.dto';
import { TeacherUpdateDto } from './dto/teacher.update.dto';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel('Teacher')
    private readonly teacherModel: Model<Teacher>,
  ) {}

  async create(teacherCreateDto: TeacherCreateDto) {
    await this.teacherModel.create({ ...teacherCreateDto });

    return 'Teacher Created';
  }

  async getAll(school_id: string) {
    return this.teacherModel.find({ school_id });
  }

  async getOne(teacher_id: string, school_id: string) {
    const teacher = await this.teacherModel.findOne({
      _id: teacher_id,
      school_id,
    });

    if (!teacher) throw new NotFoundException('Teacher Not Found');

    return teacher;
  }

  async update(
    teacher_id: string,
    school_id: string,
    teacherUpdateDto: TeacherUpdateDto,
  ) {
    const updatedTeacher = await this.teacherModel.findOneAndUpdate(
      { _id: teacher_id, school_id },
      { ...teacherUpdateDto },
    );

    if (!updatedTeacher) throw new NotFoundException('Teacher Not Found');

    return 'Teacher Updated';
  }

  async delete(teacher_id: string, school_id: string) {
    const deletedTeacher = await this.teacherModel.findOneAndDelete({
      _id: teacher_id,
      school_id,
    });

    if (!deletedTeacher) throw new NotFoundException('Teacher Not Found');

    return 'Teacher Deleted';
  }
}
