import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';
import { Comment } from '../comments/comment.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reporterId: number;

  @Column({ nullable: true })
  targetPostId: number;

  @Column()
  reason: string;

  @Column({ nullable: true })
  targetCommentId: number;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => User)
  reporter: User;

  @ManyToOne(() => Post)
  targetPost: Post;

  @ManyToOne(() => Comment)
  targetComment: Comment;
}
