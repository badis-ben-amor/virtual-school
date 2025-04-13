import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { classSchool } from 'src/classSchool/classSchool.model';
import { School } from 'src/school/school.model';

@Table({ timestamps: true })
export class Student extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column(DataType.STRING(50))
  firstName: string;

  @Column(DataType.STRING(50))
  lastName: string;

  @Column(DataType.STRING(100))
  email: string;

  @Column(DataType.STRING)
  password: string;

  @ForeignKey(() => School)
  @Column(DataType.INTEGER)
  school_id: number;

  @ForeignKey(() => classSchool)
  @Column(DataType.INTEGER)
  class_school_id: number;
}
