import { WordDictionary } from './word-dictionary.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DATA_SOURCE } from '../../constants/data-source';

@Injectable()
export class WordDictionariesService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.WORD_DICTIONARY)
    private readonly wordDictionaryRepository: Repository<WordDictionary>,
  ) {}
}
