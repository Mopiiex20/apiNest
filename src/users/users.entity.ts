import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table
export class users extends Model<users> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    field: '_id',
  })
  _id: number;
  
  @Column
  firstName: string;

  @Column
  password: string;

  @Column
  age: number;

  @Column
  email: string;

  @Column
  avatar: string;

  @Column
  roleId: number;

}