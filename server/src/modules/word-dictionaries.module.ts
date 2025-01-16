import { Module } from '@nestjs/common';
import { WordDictionariesController } from '../controllers/word-dictionaries.controller';
import { WordDictionariesService } from '../services/word-dictionaries.service';
import { DatabaseModule } from '../config/database.module';
import { wordDictionariesProvider } from '../providers/word-dictionaries.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [WordDictionariesController],
  providers: [...wordDictionariesProvider, WordDictionariesService],
})
export class WordDictionariesModule {}
