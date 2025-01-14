import { Module } from '@nestjs/common';
import { UsedWordsController } from './used-words.controller';
import { UsedWordsService } from './used-words.service';
import { usedWordsProvider } from './used-words.provider';
import { DatabaseModule } from '../../config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsedWordsController],
  providers: [...usedWordsProvider, UsedWordsService],
})
export class UsedWordsModule {}
