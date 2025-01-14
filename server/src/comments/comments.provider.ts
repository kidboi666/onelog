import { DATA_SOURCE } from '../../constants/data-source';
import { DataSource } from 'typeorm';
import { Comment } from './comment.entity';

export const commentsProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.COMMENT,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comment),
    inject: [DATA_SOURCE.INJECT],
  },
];
