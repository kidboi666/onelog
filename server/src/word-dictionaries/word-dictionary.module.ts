import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordDictionaryController } from './word-dictionary.controller';
import { WordDictionary } from './word-dictionary.entity';
import { WordDictionaryService } from './word-dictionary.service';

@Module({
  imports: [TypeOrmModule.forFeature([WordDictionary])],
  controllers: [WordDictionaryController],
  providers: [WordDictionaryService],
  exports: [WordDictionaryService],
})
export class WordDictionaryModule {}
