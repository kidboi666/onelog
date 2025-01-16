import { Module } from '@nestjs/common';
import { PostsController } from '../controllers/posts.controller';
import { PostsService } from '../services/posts.service';
import { DatabaseModule } from '../config/database.module';
import { postsProvider } from '../providers/posts.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PostsController],
  providers: [...postsProvider, PostsService],
})
export class PostsModule {}
