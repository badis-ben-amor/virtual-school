import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { User } from './user.model';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private readonly userRepository: typeof User,
  ) {}

  async getUser(id: number) {
    try {
      const user = await this.userRepository.findOne({
        where: { id },
        attributes: {
          exclude: ['password', 'email', 'createdAt', 'updatedAt'],
        },
      });

      if (!user) throw new NotFoundException('User not find');

      return user;
    } catch (error) {
      throw new InternalServerErrorException('Get user failed');
    }
  }
}
