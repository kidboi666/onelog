import { Expose, Type } from 'class-transformer';
import { PostType } from '../../types/enums.type';
import { UserInfoDto } from './user-info.dto';

export class PostsDto {
  @Expose()
  id: number;

  @Expose()
  userId: string;

  @Expose()
  postType: PostType;

  @Expose()
  emotionLevel: string;

  @Expose()
  content: string;

  @Expose()
  tags: string[];

  @Expose()
  accessType: string;

  @Expose()
  title: string;

  @Expose()
  @Type(() => UserInfoDto)
  user: UserInfoDto;

  @Expose()
  commentCount: number;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
