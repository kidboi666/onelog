import { Controller, Get } from '@nestjs/common';
import { CommentService } from '../comments/comment.service';

@Controller('posts')
export class PostController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  findAll() {
    return this.commentService.findAll();
  }
}
