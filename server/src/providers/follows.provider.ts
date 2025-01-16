import { DATA_SOURCE } from '../constants/index.constant';
import { Follow } from '../entities/follow.entity';
import { DataSource } from 'typeorm';

export const followsProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.FOLLOW,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Follow),
    inject: [DATA_SOURCE.INJECT],
  },
];
