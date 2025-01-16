import { Like } from '../entities/like.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DATA_SOURCE } from '../constants/index.constant';

@Injectable()
export class LikesService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.LIKE)
    private likeRepository: Repository<Like>,
  ) {}
}
