import { Table, Column, Model, DataType } from 'sequelize-typescript';
import { User as UserType } from '../shared/user.types';

@Table({
  tableName: 'user',
  timestamps: true,
})
export class User extends Model implements UserType {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  name?: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  googleId!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  accessToken!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: true,
  })
  refreshToken?: string;
}
