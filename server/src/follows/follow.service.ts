import { Injectable } from '@nestjs/common';
import { Follow } from './follow.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class FollowService {
  constructor(
    @InjectRepository(Follow) private followRepository: Repository<Follow>,
  ) {}
}
