import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post) private readonly postRepository: Repository<Post>,
  ) {}

  findAll() {
    return this.postRepository.find();
  }
}
