import { Module } from '@nestjs/common';
import { LikesController } from '../controllers/likes.controller';
import { LikesService } from '../services/likes.service';
import { Like } from '../entities/like.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Like])],
  controllers: [LikesController],
  providers: [LikesService],
})
export class LikesModule {}
