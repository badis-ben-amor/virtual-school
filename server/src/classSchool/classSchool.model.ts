import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { School } from 'src/school/school.model';

@Table({ timestamps: true })
export class classSchool extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @ForeignKey(() => School)
  @Column(DataType.INTEGER)
  school_id: number;
}
