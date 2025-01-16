import { Controller } from '@nestjs/common';
import { WordDictionariesService } from '../services/word-dictionaries.service';

@Controller('word-dictionaries')
export class WordDictionariesController {
  constructor(
    private readonly wordDictionaryService: WordDictionariesService,
  ) {}
}
