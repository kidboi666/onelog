import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateCommentDto {
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
