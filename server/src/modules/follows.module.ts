import { Module } from '@nestjs/common';
import { FollowsController } from '../controllers/follows.controller';
import { FollowsService } from '../services/follows.service';
import { DatabaseModule } from '../config/database.module';
import { followsProvider } from '../providers/follows.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FollowsController],
  providers: [...followsProvider, FollowsService],
  exports: [FollowsService],
})
export class FollowsModule {}
