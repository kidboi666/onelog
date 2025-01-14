import { Injectable } from '@nestjs/common';
import { UsedWord } from './used-word.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsedWordService {
  constructor(
    @InjectRepository(UsedWord)
    private usedWordRepository: Repository<UsedWord>,
  ) {}
}
