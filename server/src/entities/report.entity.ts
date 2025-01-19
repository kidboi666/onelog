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

  @Column({ name: 'reporter_id', type: 'uuid' })
  reporterId: string;

  @Column({ name: 'target_post_id', nullable: true })
  targetPostId: number;

  @Column()
  reason: string;

  @Column({ name: 'target_comment_id', nullable: true })
  targetCommentId: number;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User)
  reporter: User;

  @ManyToOne(() => Post)
  targetPost: Post;

  @ManyToOne(() => Comment)
  targetComment: Comment;
}
