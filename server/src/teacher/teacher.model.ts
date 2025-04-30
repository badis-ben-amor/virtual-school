import { Column, DataType, ForeignKey, Table } from 'sequelize-typescript';
import { School } from '../school/school.model';
import { Subject } from '../subject/subject.model';

@Table({ timestamps: true })
export class Teacher {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column({ type: DataType.STRING, allowNull: false })
  name: string;

  @Column({ type: DataType.STRING, unique: true, allowNull: false })
  email: string;

  @Column({ type: DataType.STRING, allowNull: false })
  password: string;

  @ForeignKey(() => School)
  @Column({ type: DataType.INTEGER })
  school_id: number;

  @ForeignKey(() => Subject)
  @Column(DataType.INTEGER)
  subject_id: number;
}
