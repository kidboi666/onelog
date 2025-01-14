import { Module } from '@nestjs/common';
import { WordDictionariesController } from './word-dictionaries.controller';
import { WordDictionariesService } from './word-dictionaries.service';
import { DatabaseModule } from '../../config/database.module';
import { wordDictionariesProvider } from './word-dictionaries.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [WordDictionariesController],
  providers: [...wordDictionariesProvider, WordDictionariesService],
})
export class WordDictionariesModule {}
