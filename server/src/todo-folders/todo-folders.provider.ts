import { DATA_SOURCE } from '../../constants/data-source';
import { DataSource } from 'typeorm';
import { TodoFolder } from './todo-folder.entity';

export const todoFoldersProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.TODO_FOLDER,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TodoFolder),
    inject: [DATA_SOURCE.INJECT],
  },
];
