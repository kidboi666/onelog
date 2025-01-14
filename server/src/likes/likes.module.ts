import { Module } from '@nestjs/common';
import { LikesController } from './likes.controller';
import { LikesService } from './likes.service';
import { DatabaseModule } from '../../config/database.module';
import { likesProvider } from './likes.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [LikesController],
  providers: [...likesProvider, LikesService],
})
export class LikesModule {}
