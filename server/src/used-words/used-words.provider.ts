import { DATA_SOURCE } from '../constants';
import { DataSource } from 'typeorm';
import { UsedWord } from './used-word.entity';

export const usedWordsProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.USED_WORD,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UsedWord),
    inject: [DATA_SOURCE.INJECT],
  },
];
