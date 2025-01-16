import { DataSource } from 'typeorm';
import { WordDictionary } from '../entities/word-dictionary.entity';
import { DATA_SOURCE } from '../constants/index.constant';

export const wordDictionariesProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.WORD_DICTIONARY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WordDictionary),
    inject: [DATA_SOURCE.INJECT],
  },
];
