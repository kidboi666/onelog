import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CreateCommentDto } from '../dtos/request/create-comment.dto';
import { UpdateCommentDto } from '../dtos/request/update-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get(':postId')
  async findByPostId(@Param('postId') postId: number) {
    return await this.commentsService.findByPostId(postId);
  }

  @Post()
  async createComment(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    await this.commentsService.create(createCommentDto);
  }

  @Patch('/:id')
  async updateComment(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<void> {
    await this.commentsService.update(parseInt(id), updateCommentDto);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number): Promise<void> {
    await this.commentsService.delete(id);
  }
}
