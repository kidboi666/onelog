import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsModule } from './posts.module';
import { CommentsModule } from './comments.module';
import { FollowsModule } from './follows.module';
import { GardensModule } from './gardens.module';
import { LikesModule } from './likes.module';
import { MessagesModule } from './messages.module';
import { ReportsModule } from './reports.module';
import { TodoFoldersModule } from './todo-folders.module';
import { TodoModule } from './todo.module';
import { UsedWordsModule } from './used-words.module';
import { UsersModule } from './users.module';
import { WordDictionariesModule } from './word-dictionaries.module';
import { AppService } from '../services/app.service';
import { AppController } from '../controllers/app.controller';
import { LoggerMiddleware } from '../middlewares/logger.middleware';

const cookieSession = require('cookie-session');

@Module({
  /**
   * @imports 이 모듈에서 사용하기 위한 프로바이더를 가지고 있는 다른 모듈을 가져오는 곳.
   */
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          type: 'postgres',
          host: config.get<string>('DB_HOST'),
          database: config.get<string>('DB_NAME'),
          port: config.get<number>('DB_PORT'),
          username: config.get<string>('DB_USERNAME'),
          password: config.get<string>('DB_PASSWORD'),
          entities: [__dirname + '/../**/*.entity{.ts,.js}'],
          synchronize: config.get<string>('NODE_ENV') !== 'production',
          dropSchema: config.get<string>('NODE_ENV') === 'test',
        };
      },
    }),
    CommentsModule,
    FollowsModule,
    GardensModule,
    LikesModule,
    MessagesModule,
    PostsModule,
    ReportsModule,
    TodoFoldersModule,
    TodoModule,
    UsedWordsModule,
    UsersModule,
    WordDictionariesModule,
  ],
  /**
   * @controllers 들어오는 요청을 받고 처리된 결과를 응답으로 돌려주는 인터페이스 역할
   */
  controllers: [AppController],
  /**
   * @providers 앱이 제공하고자 하는 핵심 기능, 즉 비즈니스 로직을 수행하는 역할을 하는 것이 프로바이더
   * ex) service, repository, factory, helper
   */
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class AppModule implements NestModule {
  constructor(private readonly configService: ConfigService) {}

  // 애플리케이션이 들어오는 트래픽을 수신할 때 자동으로 호출 됨
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get<string>('COOKIE_SECRET')],
        }),
        LoggerMiddleware,
      )
      .forRoutes('*');
    // 전체 애플리케이션에 들어오는 모든 요청에 이 미들웨어를 사용하겠다는 와일드카드
  }
}
