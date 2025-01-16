import { Module } from '@nestjs/common';
import { CommentsController } from '../controllers/comments.controller';
import { CommentsService } from '../services/comments.service';
import { DatabaseModule } from '../config/database.module';
import { commentsProvider } from '../providers/comments.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [...commentsProvider, CommentsService],
})
export class CommentsModule {}
