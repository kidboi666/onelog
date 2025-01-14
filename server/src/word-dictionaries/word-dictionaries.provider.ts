import { DataSource } from 'typeorm';
import { WordDictionary } from './word-dictionary.entity';
import { DATA_SOURCE } from '../../constants/data-source';

export const wordDictionariesProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.WORD_DICTIONARY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(WordDictionary),
    inject: [DATA_SOURCE.INJECT],
  },
];
