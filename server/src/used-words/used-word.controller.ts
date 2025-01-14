import { UsedWordService } from './used-word.service';
import { Controller } from '@nestjs/common';

@Controller('used-words')
export class UsedWordController {
  constructor(private readonly usedWordService: UsedWordService) {}
}
