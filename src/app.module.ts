import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/users.model';

@Module({
  controllers: [],
  providers: [],
  imports: [
    ConfigModule.forRoot({ envFilePath: '.env' }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: process.env.DB_PASSWORD,
      database: 'user-service',
      models: [User],
      autoLoadModels: true,
    }),
    UsersModule,
  ],
})
export class AppModule {}
