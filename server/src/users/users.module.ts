import { Module } from '@nestjs/common';
import { AuthController, UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';
import { DatabaseModule } from '../../config/database.module';
import { AuthService } from '../auth/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, AuthController],
  providers: [...usersProvider, UsersService, AuthService],
})
export class UsersModule {}
