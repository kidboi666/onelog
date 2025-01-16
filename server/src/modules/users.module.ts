import { Module } from '@nestjs/common';
import {
  AuthController,
  UsersController,
} from '../controllers/users.controller';
import { UsersService } from '../services/users.service';
import { usersProvider } from '../providers/users.provider';
import { DatabaseModule } from '../config/database.module';
import { AuthService } from '../services/auth.service';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, AuthController],
  providers: [...usersProvider, UsersService, AuthService],
})
export class UsersModule {}
