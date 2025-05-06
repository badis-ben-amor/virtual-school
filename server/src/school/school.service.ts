import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { School, SchoolSchema } from './school.schema';
import { SchoolCreateDto } from './dto/school.create.dto';
import { ReqUserDto } from '../common/req.user.dto';
import { UpdateUserDto } from '../user/dto/user.update.dto';
import { SchoolUpdateDto } from './dto/school.update.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel('School')
    private readonly schoolModel: Model<School>,
  ) {}

  async getAll(req: ReqUserDto) {
    return await this.schoolModel.find({ user_id: req.user.id });
  }

  async getOne(school_id: any, req: ReqUserDto) {
    const school = await this.schoolModel.findOne({
      _id: school_id,
      user_id: req.user.id,
    });

    if (!school) throw new NotFoundException('School not found');

    return school;
  }

  async create(schoolCreateDto: SchoolCreateDto, req: ReqUserDto) {
    return await this.schoolModel.create({
      ...schoolCreateDto,
      user_id: req.user.id,
    });
  }

  async update(schoolUpdateDto: SchoolUpdateDto, req: ReqUserDto) {
    return await this.schoolModel.findByIdAndUpdate(
      req.user.id,
      schoolUpdateDto,
      { new: true },
    );
  }

  async deleteSchool(req: ReqUserDto) {
    return this.schoolModel.findByIdAndDelete(req.user.id);
  }
}
