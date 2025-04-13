import {
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/user.model';

@Table({ timestamps: true })
export class School extends Model {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  name: string;

  @Column(DataType.TEXT)
  description: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  owner_id: number;

  @Column(DataType.STRING)
  address: string;

  @Column(DataType.STRING)
  contact_email: string;

  @Column(DataType.STRING)
  contact_phone: string;

  @Column(DataType.STRING(500))
  logo_url: string;

  @Column(DataType.STRING)
  website_url: string;
}
