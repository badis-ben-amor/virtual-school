import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { School } from './school.model';

@Injectable()
export class SchoolService {
  constructor(
    @InjectModel(School)
    private readonly schoolRepositoy: typeof School,
  ) {}

  async getOne(userId: number) {
    return await this.schoolRepositoy.findOne({
      where: { owner_id: userId },
      // include: [{ model: User, attributes: ['id', 'name', 'email'] }],
    });
  }

  async create(schoolData: any, userId: any) {
    return await this.schoolRepositoy.create({
      name: schoolData.name,
      description: schoolData.description,
      owner_id: userId,
      address: schoolData.address,
      contact_email: schoolData.contact_email,
      contact_phone: schoolData.contact_phone,
      logo_url: schoolData.logo_url,
      website_url: schoolData.website_url,
    });
  }

  async update(schoolData: any, userId: any) {
    return await this.schoolRepositoy.update(
      {
        name: schoolData.name,
        description: schoolData.description,
        owner_id: userId,
        address: schoolData.address,
        contact_email: schoolData.contact_email,
        contact_phone: schoolData.contact_phone,
        logo_url: schoolData.logo_url,
        website_url: schoolData.website_url,
      },
      { where: { owner_id: userId } },
    );
  }

  async deleteSchool(userId: any) {
    return this.schoolRepositoy.destroy({ where: { owner_id: userId } });
  }
}
