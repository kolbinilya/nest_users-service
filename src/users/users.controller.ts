import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @ApiOperation({ summary: 'Seed users' })
  @ApiResponse({ status: 200, type: String })
  @Post('seed')
  seedUsers(@Body('count') count: number) {
    return this.usersService.seedUsers(1000000);
  }

  // @ApiOperation({ summary: 'Get all users' })
  // @ApiResponse({ status: 200, type: [User] })
  // @Get()
  // GetAll() {
  //   return this.usersService.getAllUsers();
  // }

  @ApiOperation({ summary: 'get all users by page' })
  @ApiResponse({ status: 200, type: String })
  @Get()
  async getAllUsersByPages(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 100,
  ) {
    return this.usersService.getAllUsersByPages(page, limit);
  }

  @ApiOperation({ summary: 'Resolve user issues and count affected users' })
  @ApiResponse({ status: 200, description: 'Number of users updated' })
  @Post('/resolve-issues')
  async resolveIssues() {
    return this.usersService.resolveIssues();
  }
}
