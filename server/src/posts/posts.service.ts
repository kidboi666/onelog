import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { DATA_SOURCE } from '../../constants/data-source';
import { CreatePostDto } from './dto/create-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.POST)
    private readonly postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepository.find();
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

  findOne(id: number) {
    return this.postRepository.findOne({ where: { id } });
  }
}
