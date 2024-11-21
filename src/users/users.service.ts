import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { faker } from '@faker-js/faker';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userRepository: typeof User) {}
  async createUser(dto: CreateUserDto) {
    const user = await this.userRepository.create(dto);
    return user;
  }

  async getAllUsers() {
    const users = await this.userRepository.findAll();
    return users;
  }
  async getAllUsersByPages(page: number, limit: number) {
    const offset = (page - 1) * limit;
    return User.findAndCountAll({ offset, limit });
  }

  async seedUsers(count: number): Promise<string> {
    const users = Array.from({ length: count }).map(() => ({
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      age: faker.number.int({ min: 18, max: 80 }),
      gender: faker.helpers.arrayElement(['male', 'female']),
      hasIssues: faker.datatype.boolean(),
    }));

    await User.bulkCreate(users);
    return `${count} users have been seeded.`;
  }

  async resolveIssues(): Promise<{ updatedCount: number }> {
    const count = await User.count({ where: { hasIssues: true } });
    await User.update({ hasIssues: false }, { where: { hasIssues: true } });

    return { updatedCount: count };
  }
}
