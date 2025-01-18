import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCommentDto } from '../dtos/request/create-comment.dto';
import { UpdateCommentDto } from '../dtos/request/update-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentRepository: Repository<Comment>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<void> {
    const { userId, content, postId, commentId } = createCommentDto;
    const newComment = this.commentRepository.create({
      userId,
      content,
      postId,
      commentId: commentId ?? null,
    });

    await this.commentRepository.save(newComment);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto) {
    const foundComment = await this.commentRepository.findOneBy({ id });

    if (!foundComment) {
      throw new NotFoundException('Comment does not exist');
    }

    Object.assign(foundComment, updateCommentDto);
    await this.commentRepository.save(foundComment);
  }

  async delete(id: number) {
    const foundComment = await this.commentRepository.findOneBy({ id });

    if (!foundComment) {
      throw new NotFoundException('Comment does not exist');
    }

    await this.commentRepository.delete(id);
  }
}
