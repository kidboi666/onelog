import { DATA_SOURCE } from '../constants/index.constant';
import { DataSource } from 'typeorm';
import { UsedWord } from '../entities/used-word.entity';

export const usedWordsProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.USED_WORD,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(UsedWord),
    inject: [DATA_SOURCE.INJECT],
  },
];
