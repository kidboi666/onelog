import { Inject, Injectable } from '@nestjs/common';
import { UsedWord } from '../entities/used-word.entity';
import { Repository } from 'typeorm';
import { DATA_SOURCE } from '../constants/index.constant';

@Injectable()
export class UsedWordsService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.USED_WORD)
    private usedWordRepository: Repository<UsedWord>,
  ) {}
}
