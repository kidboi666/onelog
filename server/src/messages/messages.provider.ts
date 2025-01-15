import { DATA_SOURCE } from '../constants';
import { DataSource } from 'typeorm';
import { Message } from './message.entity';

export const messagesProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.MESSAGE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Message),
    inject: [DATA_SOURCE.INJECT],
  },
];
