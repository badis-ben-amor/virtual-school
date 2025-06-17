import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model } from 'mongoose';
import { Classroom } from './classRoom.schema';
import { ClassRoomCreateDto } from './dto/classRoom.Create.dto';
import { School } from '../school/school.schema';
import { ClassRoomUpdateDto } from './dto/classRoom.update.dto';

@Injectable()
export class ClassRoomService {
  constructor(
    @InjectModel('Classroom') private readonly classRoomModel: Model<Classroom>,
    @InjectModel('School') private readonly schoolModel: Model<School>,
  ) {}

  async create(classRoomCreateDto: ClassRoomCreateDto) {
    const school = await this.schoolModel.findById(
      classRoomCreateDto.school_id,
    );
    if (!school)
      throw new NotFoundException('School required to create classroom');

    await this.classRoomModel.create(classRoomCreateDto);

    return 'Classroom created successfully';
  }

  async getAll(
    school_id: string,
    page: number,
    limit: number,
    search_by_name?: string,
    sort_by_name?: 'asc' | 'desc',
    sort_by_date?: 'asc' | 'desc',
  ) {
    const filter: any = { school_id: new mongoose.Types.ObjectId(school_id) };
    const sort: any = {};
    const pipeline: any = [{ $match: filter }];
    if (search_by_name)
      filter.classroom_name = { $regex: search_by_name, $options: 'i' };
    if (sort_by_name) sort.classroom_name = sort_by_name === 'asc' ? 1 : -1;
    if (sort_by_date) sort.createdAt = sort_by_date === 'asc' ? 1 : -1;
    if (sort_by_name || sort_by_date) pipeline.push({ $sort: sort });
    if (page && limit)
      pipeline.push({ $skip: (page - 1) * limit }, { $limit: limit });
    const [data, total] = await Promise.all([
      this.classRoomModel.aggregate([
        ...pipeline,
        {
          $lookup: {
            from: 'students',
            localField: '_id',
            foreignField: 'classroom_id',
            as: 'students',
          },
        },
        {
          $addFields: {
            studentsLength: { $size: '$students' },
          },
        },
        {
          $project: {
            students: 0,
            createdAt: 0,
            updatedAt: 0,
            __v: 0,
          },
        },
      ]),
      this.classRoomModel.countDocuments(filter),
    ]);

    return { data, page, total, pages: Math.ceil(total / limit) };
  }

  async getOne(classroom_id: string, school_id: string) {
    const classRoom = await this.classRoomModel.findOne({
      _id: classroom_id,
      school_id,
    });

    if (!classRoom) throw new NotFoundException('Classroom not found');

    return classRoom;
  }

  async update(
    classroom_id: string,
    school_id: string,
    classRoomUpdateDto: ClassRoomUpdateDto,
  ) {
    const updatedClassRoom = await this.classRoomModel.findOneAndUpdate(
      { _id: classroom_id, school_id },
      { ...classRoomUpdateDto },
    );

    if (!updatedClassRoom) throw new NotFoundException('Classroom Not Found');

    return { message: 'classroom updated successfully' };
  }

  async delete(classroom_id: string, school_id: string) {
    const deletedClassRoom = await this.classRoomModel.findOneAndDelete({
      _id: classroom_id,
      school_id,
    });

    if (!deletedClassRoom) throw new NotFoundException('Classroom Not Found');

    return 'Classroom deleted successfully';
  }
}
