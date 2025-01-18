import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/request/create-post.dto';
import { UpdatePostDto } from '../dtos/request/update-post.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll() {
    return await this.postRepository.find();
  }

  async findOne(id: number) {
    return await this.postRepository.findOne({ where: { id } });
  }

  async create(createPostDto: CreatePostDto) {
    const { title, postType, accessType, tags, userId, emotionLevel, content } =
      createPostDto;
    const newPost = this.postRepository.create({
      title: title ?? null,
      postType,
      accessType,
      tags: tags ?? null,
      userId,
      emotionLevel: emotionLevel ?? null,
      content,
    });

    return await this.postRepository.save(newPost);
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const { title, postType, accessType, tags, userId, emotionLevel, content } =
      updatePostDto;
    await this.postRepository.update(id, {
      title,
      postType,
      accessType,
      tags: tags ?? null,
      userId,
      emotionLevel: emotionLevel ?? null,
      content,
    });
  }

  async delete(id: number) {
    const foundPost = await this.postRepository.findOne({ where: { id } });

    if (!foundPost) {
      throw new NotFoundException('Post not found');
    }

    await this.postRepository.delete(id);
  }
}
