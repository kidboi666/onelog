import { Module } from '@nestjs/common';
import { UsedWordsController } from '../controllers/used-words.controller';
import { UsedWordsService } from '../services/used-words.service';
import { usedWordsProvider } from '../providers/used-words.provider';
import { DatabaseModule } from '../config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [UsedWordsController],
  providers: [...usedWordsProvider, UsedWordsService],
})
export class UsedWordsModule {}
