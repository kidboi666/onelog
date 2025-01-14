import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './posts/post.module';
import { CommentModule } from './comments/comment.module';
import { FollowModule } from './follows/follow.module';
import { GardenModule } from './gardens/garden.module';
import { LikeModule } from './likes/like.module';
import { MessageModule } from './messages/message.module';
import { ReportModule } from './reports/report.module';
import { TodoFolderModule } from './todo-folders/todo-folder.module';
import { TodoModule } from './todos/todo.module';
import { UsedWordModule } from './used-words/used-word.module';
import { UserModule } from './users/user.module';
import { WordDictionaryModule } from './word-dictionaries/word-dictionary.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: ['./src/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CommentModule,
    FollowModule,
    GardenModule,
    LikeModule,
    MessageModule,
    PostModule,
    ReportModule,
    TodoFolderModule,
    TodoModule,
    UsedWordModule,
    UserModule,
    WordDictionaryModule,
  ],
})
export class AppModule {}
