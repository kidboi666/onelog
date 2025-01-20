import { Expose, Type } from 'class-transformer';
import { PostsDto } from './posts.dto';

export class PaginatedPostsDto {
  @Expose()
  @Type(() => PostsDto)
  data: PostsDto[];

  @Expose()
  total: number;

  @Expose()
  page: number;

  @Expose()
  lastPage: number;
}
