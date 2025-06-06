import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject } from './subject.schema';
import { SubjectCreateDto } from './dto/subject.create.dto';
import { SubjectUpdatedTO } from './dto/subject.update.dto';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel('Subject') private readonly subjectModel: Model<Subject>,
  ) {}

  async create(subjectCreateDto: SubjectCreateDto) {
    await this.subjectModel.create({ ...subjectCreateDto });

    return 'Subject Created Successfully';
  }

  async getAll(
    school_id: string,
    page: number,
    limit: number,
    search_by_subject_name: string,
    sortByName: 'asc' | 'desc',
    sortByDate: 'asc' | 'desc',
  ) {
    const filter: any = { school_id };
    if (search_by_subject_name) {
      filter.subject_name = { $regex: search_by_subject_name, $options: 'i' };
    }
    const [data, total] = await Promise.all([
      await this.subjectModel
        .find(filter)
        .skip((page - 1) * limit)
        .limit(limit)
        .sort({
          ...(sortByName && {
            subject_name: sortByName,
          }),
          ...(sortByDate && { createdAt: sortByDate }),
        }),
      this.subjectModel.countDocuments(filter),
    ]);

    return {
      data,
      total,
      pageCount: Math.ceil(total / limit),
      page,
    };
  }

  async getOne(subject_id: string, school_id: string) {
    const subject = await this.subjectModel
      .findOne({
        _id: subject_id,
        school_id,
      })
      .select('-__v -_id -school_id');

    if (!subject) throw new NotFoundException('Subject Not Found');

    return subject;
  }

  async update(
    subject_id: string,
    school_id: string,
    subjectUpdatedTO: SubjectUpdatedTO,
  ) {
    const updatedSubject = await this.subjectModel.findOneAndUpdate(
      { _id: subject_id, school_id },
      { ...subjectUpdatedTO },
    );

    if (!updatedSubject) throw new NotFoundException('Subject does not exist');

    return 'Subject updated';
  }

  async delete(subject_id: string, school_id: string) {
    const deletedSubject = await this.subjectModel.findOneAndDelete({
      _id: subject_id,
      school_id,
    });

    if (!deletedSubject) throw new NotFoundException('Subject does not exist');

    return 'Subject deleted';
  }
}
