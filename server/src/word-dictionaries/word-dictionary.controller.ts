import { Controller } from '@nestjs/common';
import { WordDictionaryService } from './word-dictionary.service';

@Controller('word-dictionaries')
export class WordDictionaryController {
  constructor(private readonly wordDictionaryService: WordDictionaryService) {}
}
