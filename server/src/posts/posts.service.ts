import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { DATA_SOURCE } from '../constants';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.POST)
    private readonly postRepository: Repository<Post>,
  ) {}

  async findAll() {
    return await this.postRepository.find();
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

  async findOne(id: number) {
    return await this.postRepository.findOne({ where: { id } });
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
}
