import { Expose } from 'class-transformer';

export class CommentDto {
  @Expose()
  id: number;

  @Expose()
  content: string;

  @Expose()
  postId: number;

  @Expose()
  commentId: number;

  @Expose()
  userId: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
