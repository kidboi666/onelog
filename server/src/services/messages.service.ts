import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from '../entities/message.entity';
import { DATA_SOURCE } from '../constants/index.constant';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.MESSAGE)
    private messageRepository: Repository<Message>,
  ) {}
}
