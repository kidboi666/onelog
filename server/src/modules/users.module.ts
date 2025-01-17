import { Module } from '@nestjs/common';
import { UsersController } from '../controllers/users.controller';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { UsersService } from '../services/users.service';
import { AuthService } from '../services/auth.service';
import { AuthController } from '../controllers/auth.controller';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController, AuthController],
  /**
   * providers는 DI 컨테이너에 주입하려 할 수 있는 모든 클래스의 리스트이다.
   * 이러한 프로바이더, 또는 클래스 리스트를 추가하면 원하는 인스턴스를 만들 방법을 DI 컨테이너가 알 수 있다.
   * 클래스 하나의 인스턴스를 만들 때마다, DI 컨테이너는 해당 클래스의 모든 의존성 인스턴스 역시 생성하게 됨.
   * 결론적으로 프로바이더 리스트는 DI 컨테이너에 등록하려는 클래스 리스트이다.
   */
  providers: [
    UsersService,
    AuthService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
  ],
})
export class UsersModule {}
