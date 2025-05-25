import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Teacher } from './teacher.schema';
import { TeacherCreateDto } from './dto/teacher.create.dto';
import { TeacherUpdateDto } from './dto/teacher.update.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Injectable()
export class TeacherService {
  constructor(
    @InjectModel('Teacher')
    private readonly teacherModel: Model<Teacher>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(teacherCreateDto: TeacherCreateDto, file: Express.Multer.File) {
    if (file) {
      const teacher_img_url = await this.cloudinaryService.uploadImage(
        file,
        process.env.CLOUDINARY_TEACHERS_FOLDER!,
      );
      await this.teacherModel.create({ ...teacherCreateDto, teacher_img_url });
    } else {
      await this.teacherModel.create({ ...teacherCreateDto });
    }

    return { message: 'Teacher Created' };
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
    file: Express.Multer.File,
  ) {
    const teacher = await this.teacherModel.findOne({
      _id: teacher_id,
      school_id,
    });

    if (!teacher) throw new NotFoundException('Teacher Not Found');

    if (file) {
      if (teacher.teacher_img_url) {
        const publicId = teacher.teacher_img_url
          .split('/')
          .pop()
          ?.split('.')[0];
        if (publicId) {
          await this.cloudinaryService.deleteImage(
            publicId,
            process.env.CLOUDINARY_TEACHERS_FOLDER!,
          );
        }
      }
      const teacher_img_url = await this.cloudinaryService.uploadImage(
        file,
        process.env.CLOUDINARY_TEACHERS_FOLDER!,
      );
      teacher.set({ ...teacherUpdateDto, teacher_img_url });
      await teacher.save();
    } else {
      teacher.set({ ...teacherUpdateDto });
      teacher.save();
    }

    return { message: 'Teacher Updated' };
  }

  async delete(teacher_id: string, school_id: string) {
    const teacher = await this.teacherModel.findOneAndDelete({
      _id: teacher_id,
      school_id,
    });

    if (!teacher) throw new NotFoundException('Teacher Not Found');

    if (teacher.teacher_img_url) {
      const publicId = teacher.teacher_img_url.split('/').pop()?.split('.')[0];
      if (publicId) {
        await this.cloudinaryService.deleteImage(
          publicId,
          process.env.CLOUDINARY_TEACHERS_FOLDER!,
        );
      }
    }

    return { message: 'Teacher Deleted' };
  }
}
