import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dtos/request/create-post.dto';
import { UpdatePostDto } from '../dtos/request/update-post.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.findAll();
  }

  @Get('/:id')
  getPost(@Param('id') id: number) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  updatePost(@Param('id') id: number, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(id, updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  deletePost(@Param('id') id: number) {
    return this.postsService.delete(id);
  }
}
