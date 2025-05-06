import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { ClassRoom } from '../classRoom/classRoom.model';

@Table({ timestamps: true })
export class Subject extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @ForeignKey(() => ClassRoom)
  @Column(DataType.INTEGER)
  class_school_id: number;
}
