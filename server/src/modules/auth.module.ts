import { Module } from '@nestjs/common';
import { UsersModule } from './users.module';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';

@Module({
  imports: [UsersModule],
  providers: [AuthService], // 여기에 등록된 서비스들은 Injectable이 있어야 함
  controllers: [AuthController],
})
export class AuthModule {}

/**
 * 이해하기 쉽게 비유하면, @Injectable() 은 마치 "조립 가능" 표시가 된 레고 블럭과도 같음.
 * 이 표시가 있어야 다른 블럭들과 조립해서 사용할 수 있는 것처럼
 */
