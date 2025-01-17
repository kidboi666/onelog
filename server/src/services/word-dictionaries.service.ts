import { WordDictionary } from '../entities/word-dictionary.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WordDictionariesService {
  constructor(
    @InjectRepository(WordDictionary)
    private readonly wordDictionaryRepository: Repository<WordDictionary>,
  ) {}
}
