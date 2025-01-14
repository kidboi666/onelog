import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Message } from './message.entity';
import { DATA_SOURCE } from '../../constants/data-source';

@Injectable()
export class MessagesService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.MESSAGE)
    private messageRepository: Repository<Message>,
  ) {}
}
