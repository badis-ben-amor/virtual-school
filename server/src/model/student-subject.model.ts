import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: true })
export class StudentSubject extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  student_id: number;

  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  subject_id: number;
}
