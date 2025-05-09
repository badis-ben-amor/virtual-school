import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async getAll(school_id: string) {
    return await this.classRoomModel.find({ school_id });
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

    return 'classroom updated successfully';
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
