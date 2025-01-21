import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { CreatePostDto } from '../dtos/request/create-post.dto';
import { UpdatePostDto } from '../dtos/request/update-post.dto';
import { AuthGuard } from '../guards/auth.guard';
import { PostDto } from '../dtos/response/post.dto';
import { Serialize } from '../decorators/serialize.decorator';
import { PaginatedPostsDto } from '../dtos/response/paginated-posts.dto';
import { CurrentUser } from '../decorators/current-user.decorator';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Serialize(PaginatedPostsDto)
  @Get()
  async findAllPaginatedPosts(
    @Query('page') page = 1,
    @Query('limit') limit = 10,
  ) {
    return await this.postsService.findAllPaginatedPosts(page, limit);
  }

  @Serialize(PostDto)
  @Get(':postId')
  async getPost(@Param('postId') postId: string): Promise<PostDto> {
    return await this.postsService.findPostById(parseInt(postId));
  }

  @UseGuards(AuthGuard)
  @Post()
  createPost(
    @CurrentUser('sub') userId: string,
    @Body() createPostDto: CreatePostDto,
  ) {
    return this.postsService.createPost(userId, createPostDto);
  }

  @UseGuards(AuthGuard)
  @Patch(':postId')
  updatePost(
    @Param('postId') postId: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.updatePost(parseInt(postId), updatePostDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':postId')
  deletePost(@Param('postId') postId: string) {
    return this.postsService.deletePost(parseInt(postId));
  }
}
