import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersService } from '../services/users.service';
import { usersProvider } from '../providers/users.provider';
import { DatabaseModule } from '../config/database.module';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController, AuthController],
  providers: [
    ...usersProvider,
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
