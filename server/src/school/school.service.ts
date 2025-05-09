import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { School } from './school.schema';
import { SchoolCreateDto } from './dto/school.create.dto';
import { ReqUserDto } from '../common/req.user.dto';
import { SchoolUpdateDto } from './dto/school.update.dto';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel('School')
    private readonly schoolModel: Model<School>,
  ) {}

  async create(schoolCreateDto: SchoolCreateDto, req: ReqUserDto) {
    await this.schoolModel.create({
      ...schoolCreateDto,
      user_id: req.user.id,
    });

    return 'School create successfully';
  }

  async getAll(req: ReqUserDto) {
    return await this.schoolModel.find({ user_id: req.user.id });
  }

  async getOne(school_id: string, req: ReqUserDto) {
    const school = await this.schoolModel.findOne({
      _id: school_id,
      user_id: req.user.id,
    });

    if (!school) throw new NotFoundException('School not found');

    return school;
  }

  async update(
    school_id: string,
    schoolUpdateDto: SchoolUpdateDto,
    req: ReqUserDto,
  ) {
    const updatedSchool = await this.schoolModel.findOneAndUpdate(
      { _id: school_id, user_id: req.user.id },
      {
        ...schoolUpdateDto,
      },
    );

    if (!updatedSchool) throw new NotFoundException('School does not exist');

    return 'School updated successfully';
  }

  async deleteSchool(school_id: string, req: ReqUserDto) {
    const deletedSchool = await this.schoolModel.findOneAndDelete({
      _id: school_id,
      user_id: req.user.id,
    });

    if (!deletedSchool) throw new NotFoundException('School does not exist');

    return 'School deleted successfully';
  }
}
