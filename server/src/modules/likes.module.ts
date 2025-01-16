import { Module } from '@nestjs/common';
import { LikesController } from '../controllers/likes.controller';
import { LikesService } from '../services/likes.service';
import { DatabaseModule } from '../config/database.module';
import { likesProvider } from '../providers/likes.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [LikesController],
  providers: [...likesProvider, LikesService],
})
export class LikesModule {}
