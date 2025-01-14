import { Controller } from '@nestjs/common';
import { WordDictionariesService } from './word-dictionaries.service';

@Controller('word-dictionaries')
export class WordDictionariesController {
  constructor(
    private readonly wordDictionaryService: WordDictionariesService,
  ) {}
}
