import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './student.schema';
import { StudentCreateDto } from './dto/student.create.dto';
import { Classroom } from '../classRoom/classRoom.schema';
import { StudentUpdateDto } from './dto/update.student.dto';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student')
    private readonly studentModel: Model<Student>,
    @InjectModel('Classroom')
    private readonly classRoomModel: Model<Classroom>,
  ) {}

  async create(studentCreateDto: StudentCreateDto) {
    const classRoom = await this.classRoomModel.findById(
      studentCreateDto.classroom_id,
    );

    if (!classRoom)
      throw new NotFoundException('Classroom for that user not found');

    await this.studentModel.create({ ...studentCreateDto });

    return 'Student created successfully';
  }
  async getAll(classroom_id: string) {
    const classroom = await this.classRoomModel.findById(classroom_id);

    if (!classroom)
      throw new NotFoundException('Classroom of students does not exist');

    return await this.studentModel
      .find({ classroom_id })
      .select('-__v -_id -classroom_id');
  }

  async getOne(student_id: string, classroom_id: string) {
    const student = await this.studentModel
      .findOne({
        _id: student_id,
        classroom_id,
      })
      .select('-__v -_id -classroom_id');

    if (!student) throw new NotFoundException('Student Not Found');

    return student;
  }

  async update(
    student_id: string,
    classroom_id: string,
    studentUpdateDto: StudentUpdateDto,
  ) {
    const updatedStudent = await this.studentModel.findOneAndUpdate(
      {
        _id: student_id,
        classroom_id,
      },
      { ...studentUpdateDto },
    );

    if (!updatedStudent) throw new NotFoundException('Student Not Exist');

    return 'Student Updated Successfully';
  }

  async delete(student_id: string, classroom_id: string) {
    const deleted_student = await this.studentModel.findOneAndDelete({
      _id: student_id,
      classroom_id,
    });

    if (!deleted_student) throw new NotFoundException('Student does not exist');

    return 'Student Deleted';
  }
}
