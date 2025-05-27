import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './student.schema';
import { StudentCreateDto } from './dto/student.create.dto';
import { StudentUpdateDto } from './dto/update.student.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel('Student')
    private readonly studentModel: Model<Student>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(studentCreateDto: StudentCreateDto, file: Express.Multer.File) {
    if (file) {
      const student_img_url = await this.cloudinaryService.uploadImage(
        file,
        process.env.CLOUDINARY_STUDENT_FOLDER!,
      );
      await this.studentModel.create({
        ...studentCreateDto,
        student_img_url,
      });
    } else {
      await this.studentModel.create({
        ...studentCreateDto,
      });
    }

    return { message: 'Student Create Successfully' };
  }
  async getAll(school_id: string, page: number, limit: number) {
    const [data, total] = await Promise.all([
      this.studentModel
        .find({ school_id })
        .select('-__v')
        .populate('classroom_id', '_id classroom_name')
        .skip((page - 1) * limit)
        .limit(limit),
      this.studentModel.countDocuments(),
    ]);
    return { data, total, page, pageCount: Math.ceil(total / limit) };
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
    file: Express.Multer.File,
  ) {
    const student = await this.studentModel.findOne({
      _id: student_id,
      school_id,
    });

    if (!student) throw new NotFoundException('Student Not Found');
    if (file) {
      if (student.student_img_url) {
        const publicId = student.student_img_url
          .split('/')
          .pop()
          ?.split('.')[0];
        if (publicId) {
          await this.cloudinaryService.deleteImage(
            publicId,
            process.env.CLOUDINARY_STUDENT_FOLDER!,
          );
        }
      }
      const student_img_url = await this.cloudinaryService.uploadImage(
        file,
        process.env.CLOUDINARY_STUDENT_FOLDER!,
      );
      student.set({
        ...studentUpdateDto,
        student_img_url,
      });

      await student.save();
    } else {
      student.set({
        ...studentUpdateDto,
      });

      await student.save();
    }

    return { message: 'Student Updated Successfully' };
  }

  async delete(student_id: string, school_id: string) {
    const deleted_student = await this.studentModel.findOneAndDelete({
      _id: student_id,
      school_id,
    });

    if (!deleted_student) throw new NotFoundException('Student does not exist');

    if (deleted_student?.student_img_url) {
      const publicId = deleted_student.student_img_url
        .split('/')
        .pop()
        ?.split('.')[0];
      if (publicId) {
        await this.cloudinaryService.deleteImage(
          publicId,
          process.env.CLOUDINARY_STUDENT_FOLDER!,
        );
      }
    }

    return { message: 'Student Deleted' };
  }
}
