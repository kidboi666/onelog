import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { DATA_SOURCE } from '../../constants/data-source';

@Injectable()
export class PostsService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.POST)
    private readonly postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepository.find();
  }
}
