import { Module } from '@nestjs/common';
import { PostsModule } from './modules/posts.module';
import { CommentsModule } from './modules/comments.module';
import { FollowsModule } from './modules/follows.module';
import { GardensModule } from './modules/gardens.module';
import { LikesModule } from './modules/likes.module';
import { MessagesModule } from './modules/messages.module';
import { ReportsModule } from './modules/reports.module';
import { TodoFoldersModule } from './modules/todo-folders.module';
import { TodoModule } from './modules/todo.module';
import { UsedWordsModule } from './modules/used-words.module';
import { UsersModule } from './modules/users.module';
import { WordDictionariesModule } from './modules/word-dictionaries.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
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
