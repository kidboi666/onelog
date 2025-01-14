import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Follow } from './follow.entity';
import { FollowController } from './follow.controller';
import { FollowService } from './follow.service';

@Module({
  imports: [TypeOrmModule.forFeature([Follow])],
  controllers: [FollowController],
  providers: [FollowService],
  exports: [FollowService],
})
export class FollowModule {}
