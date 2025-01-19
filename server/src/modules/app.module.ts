import { APP_PIPE } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MiddlewareConsumer, Module, ValidationPipe } from '@nestjs/common';
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

const cookieSession = require('cookie-session');

@Module({
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
  controllers: [AppController],
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
export class AppModule {
  constructor(private readonly configService: ConfigService) {}

  // 애플리케이션이 들어오는 트래픽을 수신할 때 자동으로 호출 됨
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        cookieSession({
          keys: [this.configService.get<string>('COOKIE_SECRET')],
        }),
      )
      .forRoutes('*');
    // 전체 애플리케이션에 들어오는 모든 요청에 이 미들웨어를 사용하겠다는 와일드카드
  }
}
