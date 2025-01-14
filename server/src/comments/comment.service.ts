import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment) private commentRepository: Repository<Comment>,
  ) {}

  findAll() {
    return this.commentRepository.find();
  }
}
