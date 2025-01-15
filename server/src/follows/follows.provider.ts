import { DATA_SOURCE } from '../constants';
import { Follow } from './follow.entity';
import { DataSource } from 'typeorm';

export const followsProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.FOLLOW,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Follow),
    inject: [DATA_SOURCE.INJECT],
  },
];
