import { Column, DataType, Model, Table } from 'sequelize-typescript';

@Table({ timestamps: true })
export class User extends Model {
  @Column({ type: DataType.INTEGER, autoIncrement: true, primaryKey: true })
  id: number;

  @Column(DataType.STRING)
  name: string;

  @Column({
    type: DataType.STRING(100),
    unique: true,
  })
  email: string;

  @Column({
    type: DataType.STRING(),
  })
  password: string;

  @Column(DataType.BOOLEAN)
  isAdmin: boolean;
}
