import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'ilya', description: 'User first name' })
  readonly firstName: string;

  @ApiProperty({ example: 'kolbin', description: 'User last name' })
  readonly lastName: string;

  @ApiProperty({ example: '25', description: 'User age' })
  readonly age: number;

  @ApiProperty({ example: 'male', description: 'User gender' })
  readonly gender: string;

  @ApiProperty({ example: 'false', description: 'User has or no issues' })
  readonly hasIssues: boolean;
}
