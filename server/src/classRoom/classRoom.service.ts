// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';
// import { InjectModel } from '@nestjs/sequelize';
// import { ClassRoom } from './classRoom.model';

// @Injectable()
// export class ClassRoomService {
//   constructor(
//     @InjectModel(ClassRoom)
//     private readonly ClassRoomRepository: typeof ClassRoom,
//   ) {}

//   async createClassRoom(classRoomData: any, schoolId: any) {
//     const newClassRoom = await this.ClassRoomRepository.create({
//       name: classRoomData.name,
//       description: classRoomData.description,
//       school_id: classRoomData.school_id,
//     });

//     return 'classroom created successfuly';
//   }
// }
