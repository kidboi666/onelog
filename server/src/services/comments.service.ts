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
    private repository: Repository<Comment>,
  ) {}

  async findByPostId(postId: number) {
    const comments = await this.repository.findBy({ postId });

    if (comments.length === 0) {
      throw new NotFoundException('comment not found');
    }

    return comments;
  }

  async create(createCommentDto: CreateCommentDto): Promise<void> {
    const { userId, content, postId, commentId } = createCommentDto;
    const newComment = this.repository.create({
      userId,
      content,
      postId,
      commentId: commentId ?? null,
    });

    await this.repository.save(newComment);
  }

  async update(id: number, updateCommentDto: UpdateCommentDto): Promise<void> {
    const foundComment = await this.repository.findOneBy({ id });

    if (!foundComment) {
      throw new NotFoundException('comment does not exist');
    }

    Object.assign(foundComment, updateCommentDto);
    await this.repository.save(foundComment);
  }

  async delete(id: number): Promise<void> {
    const foundComment = await this.repository.findOneBy({ id });

    if (!foundComment) {
      throw new NotFoundException('comment does not exist');
    }

    await this.repository.delete(id);
  }
}
