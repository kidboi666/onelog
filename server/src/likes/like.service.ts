import { Like } from './like.entity';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like) private likeRepository: Repository<Like>,
  ) {}
}
