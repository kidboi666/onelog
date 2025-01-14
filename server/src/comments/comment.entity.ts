import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';
import { Post } from '../posts/post.entity';

@Entity('comments')
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  content: string;

  @Column()
  postId: number;

  @Column()
  userId: number;

  @Column({ nullable: true })
  commentId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => Comment)
  parentComment: Comment;
}
