import { DATA_SOURCE } from '../constants/index.constant';
import { Post } from '../entities/post.entity';
import { DataSource } from 'typeorm';

export const postsProvider = [
  {
    provide: DATA_SOURCE.REPOSITORIES.POST,
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Post),
    inject: [DATA_SOURCE.INJECT],
  },
];
