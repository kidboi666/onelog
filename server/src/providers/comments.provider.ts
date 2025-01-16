import { DATA_SOURCE } from '../constants/index.constant';
import { DataSource } from 'typeorm';
import { Comment } from '../entities/comment.entity';

export const commentsProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.COMMENT,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comment),
    inject: [DATA_SOURCE.INJECT],
  },
];
