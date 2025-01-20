import { Injectable } from '@nestjs/common';
import { UsedWord } from '../entities/used-word.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsedWordsService {
  constructor(
    @InjectRepository(UsedWord)
    private repository: Repository<UsedWord>,
  ) {}
}
