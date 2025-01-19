import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [UsersModule],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
