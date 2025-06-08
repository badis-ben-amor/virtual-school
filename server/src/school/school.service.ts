import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { School } from './school.schema';
import { SchoolCreateDto } from './dto/school.create.dto';
import { ReqUserDto } from '../common/req.user.dto';
import { SchoolUpdateDto } from './dto/school.update.dto';
import { CloudinaryService } from '../common/cloudinary/cloudinary.service';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel('School')
    private readonly schoolModel: Model<School>,
    private readonly cloudinaryService: CloudinaryService,
  ) {}

  async create(
    schoolCreateDto: SchoolCreateDto,
    req: ReqUserDto,
    file?: Express.Multer.File,
  ) {
    if (file) {
      const logo_url = await this.cloudinaryService.uploadImage(
        file,
        process.env.CLOUDINARY_SCHOOL_FOLDER!,
      );
      await this.schoolModel.create({
        ...schoolCreateDto,
        user_id: req.user.id,
        logo_url,
      });
    } else {
      await this.schoolModel.create({
        ...schoolCreateDto,
        user_id: req.user.id,
      });
    }

    return { message: 'School create successfully' };
  }

  async getAll(req: ReqUserDto, page: number, limit: number) {
    const [data, total] = await Promise.all([
      this.schoolModel.aggregate([
        { $match: { user_id: new mongoose.Types.ObjectId(req.user.id) } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
        {
          $lookup: {
            from: 'teachers',
            localField: '_id',
            foreignField: 'school_id',
            as: 'students',
          },
        },
        {
          $lookup: {
            from: 'classrooms',
            localField: '_id',
            foreignField: 'school_id',
            as: 'classrooms',
          },
        },
        {
          $addFields: {
            studentsLength: { $size: '$students' },
            cassroomsLength: { $size: '$classrooms' },
          },
        },
        {
          $project: {
            user_id: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
            students: 0,
            classrooms: 0,
          },
        },
      ]),
      this.schoolModel.countDocuments({ user_id: req.user.id }),
    ]);

    return { data, total, pageCount: Math.ceil(total / limit), page };
  }

  async getOne(school_id: string, req: ReqUserDto) {
    const school = await this.schoolModel.findOne({
      _id: school_id,
      user_id: req.user.id,
    });

    if (!school) throw new NotFoundException('School not found');

    return school;
  }

  async getActiveSchool(req: ReqUserDto) {
    const activeSchool = await this.schoolModel.findOne({
      is_active: true,
      user_id: req.user.id,
    });

    if (!activeSchool) throw new NotFoundException('No Active School Found');

    return { activeSchool };
  }

  async update(
    school_id: string,
    schoolUpdateDto: SchoolUpdateDto,
    req: ReqUserDto,
    file: Express.Multer.File,
  ) {
    const school = await this.schoolModel.findOne({
      _id: school_id,
      user_id: req.user.id,
    });

    if (!school) throw new NotFoundException('School does not exist');

    if (file) {
      if (school.logo_url) {
        const publicId = school.logo_url.split('/').pop()?.split('.')[0];
        if (publicId) {
          this.cloudinaryService.deleteImage(
            publicId,
            process.env.CLOUDINARY_SCHOOL_FOLDER!,
          );
        }
      }
      const logo_url = await this.cloudinaryService.uploadImage(
        file,
        process.env.CLOUDINARY_SCHOOL_FOLDER!,
      );
      school.set({ ...schoolUpdateDto, logo_url });

      await school.save();
    } else {
      school.set({ ...schoolUpdateDto });
      await school.save();
    }

    return { message: 'School updated successfully' };
  }

  async deleteSchool(school_id: string, req: ReqUserDto) {
    const deletedSchool = await this.schoolModel.findOneAndDelete({
      _id: school_id,
      user_id: req.user.id,
    });

    if (!deletedSchool) throw new NotFoundException('School does not exist');

    if (deletedSchool.logo_url) {
      const publicId = deletedSchool.logo_url.split('/').pop()?.split('.')[0];
      if (publicId) {
        this.cloudinaryService.deleteImage(
          publicId,
          process.env.CLOUDINARY_SCHOOL_FOLDER!,
        );
      }
    }
    return { message: 'School deleted successfully' };
  }
}
