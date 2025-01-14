import { Module } from '@nestjs/common';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { FollowsModule } from './follows/follows.module';
import { GardensModule } from './gardens/gardens.module';
import { LikesModule } from './likes/likes.module';
import { MessagesModule } from './messages/messages.module';
import { ReportsModule } from './reports/reports.module';
import { TodoFoldersModule } from './todo-folders/todo-folders.module';
import { TodoModule } from './todos/todo.module';
import { UsedWordsModule } from './used-words/used-words.module';
import { UsersModule } from './users/users.module';
import { WordDictionariesModule } from './word-dictionaries/word-dictionaries.module';
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
