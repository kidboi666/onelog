import { DATA_SOURCE } from '../constants/index.constant';
import { DataSource } from 'typeorm';
import { User } from '../entities/user.entity';

export const usersProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.USER,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    inject: [DATA_SOURCE.INJECT],
  },
];
