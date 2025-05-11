import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './student.schema';
import { StudentCreateDto } from './dto/student.create.dto';
import { StudentUpdateDto } from './dto/update.student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student')
    private readonly studentModel: Model<Student>,
  ) {}

  async create(studentCreateDto: StudentCreateDto) {
    await this.studentModel.create({ ...studentCreateDto });

    return 'Student created successfully';
  }
  async getAll(school_id: string) {
    return await this.studentModel
      .find({ school_id })
      .select('-__v -_id -school_id');
  }

  async getOne(student_id: string, school_id: string) {
    const student = await this.studentModel
      .findOne({
        _id: student_id,
        school_id,
      })
      .select('-__v -_id -classroom_id');

    if (!student) throw new NotFoundException('Student Not Found');

    return student;
  }

  async update(
    student_id: string,
    school_id: string,
    studentUpdateDto: StudentUpdateDto,
  ) {
    const updatedStudent = await this.studentModel.findOneAndUpdate(
      {
        _id: student_id,
        school_id,
      },
      { ...studentUpdateDto },
    );

    if (!updatedStudent) throw new NotFoundException('Student Not Exist');

    return 'Student Updated Successfully';
  }

  async delete(student_id: string, school_id: string) {
    const deleted_student = await this.studentModel.findOneAndDelete({
      _id: student_id,
      school_id,
    });

    if (!deleted_student) throw new NotFoundException('Student does not exist');

    return 'Student Deleted';
  }
}
