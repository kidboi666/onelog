import { MessageService } from './message.service';
import { Controller } from '@nestjs/common';

@Controller('messages')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}
}
