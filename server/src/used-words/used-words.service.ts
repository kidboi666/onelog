import { Inject, Injectable } from '@nestjs/common';
import { UsedWord } from './used-word.entity';
import { Repository } from 'typeorm';
import { DATA_SOURCE } from '../../constants/data-source';

@Injectable()
export class UsedWordsService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.USED_WORD)
    private usedWordRepository: Repository<UsedWord>,
  ) {}
}
