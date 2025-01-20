import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateCommentDto {
  @IsUUID()
  userId: string;

  @IsString()
  content: string;

  @IsNumber()
  postId: number;

  @IsOptional()
  @IsNumber()
  commentId: number;
}
