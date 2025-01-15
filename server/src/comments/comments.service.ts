import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';
import { DATA_SOURCE } from '../constants';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.COMMENT)
    private commentRepository: Repository<Comment>,
  ) {}
}
