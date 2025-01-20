import { Expose, Type } from 'class-transformer';
import { PostType } from '../../types/enums.type';
import { UserInfoDto } from './user-info.dto';
import { CommentDto } from './comment.dto';

export class PostDto {
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
  @Type(() => CommentDto)
  comments: CommentDto[];

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
