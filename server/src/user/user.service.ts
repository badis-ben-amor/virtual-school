import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.schema';
import { ReqUserDto } from '../common/req.user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async getUser(req: ReqUserDto) {
    const user = await this.userModel
      .findById(req.user.id)
      .select('username -_id');
    if (!user) throw new NotFoundException('User not find');

    return user;
  }
}
