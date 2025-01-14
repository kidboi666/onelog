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

@Entity('likes')
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  postId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;
}
