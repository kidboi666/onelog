import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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
  @JoinColumn({ name: 'reporter_id', referencedColumnName: 'id' })
  reporter: User;

  @ManyToOne(() => Post)
  @JoinColumn({ name: 'target_post_id', referencedColumnName: 'id' })
  targetPost: Post;

  @ManyToOne(() => Comment)
  @JoinColumn({ name: 'target_comment_id', referencedColumnName: 'id' })
  targetComment: Comment;
}
