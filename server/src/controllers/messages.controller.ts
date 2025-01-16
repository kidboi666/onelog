import { MessagesService } from '../services/messages.service';
import { Controller } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messageService: MessagesService) {}
}
