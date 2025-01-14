import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { DatabaseModule } from '../../config/database.module';
import { postsProvider } from './posts.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [...postsProvider, PostsService],
})
export class PostsModule {}
