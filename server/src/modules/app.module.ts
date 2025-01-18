import { Module } from '@nestjs/common';
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
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database:
        process.env.NODE_ENV === 'test'
          ? process.env.TEST_DB_NAME
          : process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      synchronize: process.env.NODE_ENV !== 'production',
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
})
export class AppModule {}
