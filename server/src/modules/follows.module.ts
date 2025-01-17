import { Module } from '@nestjs/common';
import { FollowsController } from '../controllers/follows.controller';
import { FollowsService } from '../services/follows.service';
import { Follow } from '../entities/follow.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  controllers: [FollowsController],
  providers: [FollowsService],
})
export class FollowsModule {}
