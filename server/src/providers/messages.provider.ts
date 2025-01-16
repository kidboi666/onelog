import { DATA_SOURCE } from '../constants/index.constant';
import { DataSource } from 'typeorm';
import { Message } from '../entities/message.entity';

export const messagesProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.MESSAGE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Message),
    inject: [DATA_SOURCE.INJECT],
  },
];
