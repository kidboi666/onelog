import { DATA_SOURCE } from '../constants/index.constant';
import { DataSource } from 'typeorm';
import { Like } from '../entities/like.entity';

export const likesProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.LIKE,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Like),
    inject: [DATA_SOURCE.INJECT],
  },
];
