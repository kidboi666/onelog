import { Like } from './like.entity';
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DATA_SOURCE } from '../../constants/data-source';

@Injectable()
export class LikesService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.LIKE)
    private likeRepository: Repository<Like>,
  ) {}
}
