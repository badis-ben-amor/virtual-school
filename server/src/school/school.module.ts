import { Module } from '@nestjs/common';
import { SchoolController } from './schoo.controller';
import { SchoolService } from './school.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { School } from './school.model';

@Module({
  imports: [SequelizeModule.forFeature([School])],
  controllers: [SchoolController],
  providers: [SchoolService],
})
export class SchoolModule {}
