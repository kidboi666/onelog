import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { CommentsService } from './comments.service';
import { DatabaseModule } from '../../config/database.module';
import { commentsProvider } from './comments.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [CommentsController],
  providers: [...commentsProvider, CommentsService],
})
export class CommentsModule {}
