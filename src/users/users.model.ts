import { ApiProperty } from '@nestjs/swagger';
import {
  Model,
  Column,
  DataType,
  Table,
  AllowNull,
} from 'sequelize-typescript';

interface UserCreationAttrs {
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  hasIssues: boolean;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: 'ilya', description: 'User first name' })
  @Column({ type: DataType.STRING, allowNull: false })
  firstName: string;

  @ApiProperty({ example: '123455', description: 'User password' })
  @Column({ type: DataType.STRING, allowNull: false })
  lastName: string;

  @ApiProperty({ example: '25', description: 'User age' })
  @Column({ type: DataType.INTEGER, allowNull: false })
  age: number;

  @ApiProperty({ example: 'male', description: 'User gender' })
  @Column({ type: DataType.STRING, allowNull: false })
  gender: string;

  @ApiProperty({ example: 'false', description: 'User has or no issussie' })
  @Column({ type: DataType.BOOLEAN, defaultValue: false })
  hasIssues: boolean;
}
