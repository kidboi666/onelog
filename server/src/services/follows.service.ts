import { Inject, Injectable } from '@nestjs/common';
import { Follow } from '../entities/follow.entity';
import { Repository } from 'typeorm';
import { DATA_SOURCE } from '../constants/index.constant';

@Injectable()
export class FollowsService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.FOLLOW)
    private followRepository: Repository<Follow>,
  ) {}
}
