import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePostDto } from '../dtos/request/create-post.dto';
import { UpdatePostDto } from '../dtos/request/update-post.dto';
import { Post } from '../entities/post.entity';
import { PaginationResult } from '../types/interfaces.type';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private repository: Repository<Post>,
  ) {}

  async findAllPaginatedPosts(
    page: number,
    limit: number,
  ): Promise<PaginationResult<Post>> {
    const [posts, total] = await this.createPostQueryBuilder()
      .leftJoinAndSelect('post.user', 'user')
      .loadRelationCountAndMap('post.commentCount', 'post.comments')
      .skip((page - 1) * limit)
      .take(limit)
      .orderBy('post.createdAt', 'DESC')
      .getManyAndCount();

    return {
      data: posts,
      total,
      page,
      lastPage: Math.ceil(total / limit),
    };
  }

  async findPostById(postId: number): Promise<Post> {
    const post = await this.createPostQueryBuilder()
      .leftJoinAndSelect('post.user', 'user')
      .leftJoinAndSelect('post.comments', 'comments')
      .loadRelationCountAndMap('post.count.likeCount', 'like.')
      .loadRelationCountAndMap('post.count.postCount', 'user.posts')
      .where('post.id = :postId', { postId })
      .getOne();

    if (!post) {
      throw new NotFoundException(`post not found (id: ${postId})`);
    }

    return post;
  }

  async createPost(userId: string, createPostDto: CreatePostDto) {
    const newPost = this.repository.create({
      userId,
      ...createPostDto,
      title: createPostDto.title ?? null,
      tags: createPostDto.tags ?? null,
      emotionLevel: createPostDto.emotionLevel ?? null,
    });

    return await this.repository.save(newPost);
  }

  async updatePost(id: number, updatePostDto: UpdatePostDto) {
    await this.verifyPostExists(id);
    const updateData = {
      ...updatePostDto,
      tags: updatePostDto.tags ?? null,
      emotionLevel: updatePostDto.emotionLevel ?? null,
    };
    await this.repository.update(id, updateData);
  }

  async deletePost(id: number) {
    await this.verifyPostExists(id);
    await this.repository.delete(id);
  }

  private createPostQueryBuilder() {
    return this.repository.createQueryBuilder('post');
  }

  private async verifyPostExists(id: number): Promise<void> {
    const post = await this.repository.findOneBy({ id });
    if (!post) {
      throw new NotFoundException(`Post not found. (id: ${id})`);
    }
  }
}
