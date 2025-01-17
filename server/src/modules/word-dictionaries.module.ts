import { Module } from '@nestjs/common';
import { WordDictionariesController } from '../controllers/word-dictionaries.controller';
import { WordDictionariesService } from '../services/word-dictionaries.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordDictionary } from '../entities/word-dictionary.entity';

@Module({
  imports: [TypeOrmModule.forFeature([WordDictionary])],
  controllers: [WordDictionariesController],
  providers: [WordDictionariesService],
})
export class WordDictionariesModule {}
