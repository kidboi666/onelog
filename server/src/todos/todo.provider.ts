import { DATA_SOURCE } from '../../constants/data-source';
import { DataSource } from 'typeorm';
import { Todo } from './todo.entity';

export const todoProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.TODO,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Todo),
    inject: [DATA_SOURCE.INJECT],
  },
];
