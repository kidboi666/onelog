import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity('reports')
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'uuid' })
  reporterId: string;

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
