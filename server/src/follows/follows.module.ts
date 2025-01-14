import { Module } from '@nestjs/common';
import { FollowsController } from './follows.controller';
import { FollowsService } from './follows.service';
import { DatabaseModule } from '../../config/database.module';
import { followsProvider } from './follows.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [FollowsController],
  providers: [...followsProvider, FollowsService],
  exports: [FollowsService],
})
export class FollowsModule {}
