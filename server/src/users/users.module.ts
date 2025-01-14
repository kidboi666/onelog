import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { usersProvider } from './users.provider';
import { DatabaseModule } from '../../config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsersController],
  providers: [...usersProvider, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
