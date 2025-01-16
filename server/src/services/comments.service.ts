import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { DATA_SOURCE } from '../constants/index.constant';

@Injectable()
export class CommentsService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.COMMENT)
    private commentRepository: Repository<Comment>,
  ) {}
}
