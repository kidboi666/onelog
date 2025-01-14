import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from '../../user_info/entities/user-info.entity';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  content: string;

  @Column()
  post_id: number;

  @Column()
  user_id: number;

  @Column({ nullable: true })
  comment_id: number;

  @ManyToOne(() => UserInfo)
  user: UserInfo;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToOne(() => Comment)
  parentComment: Comment;
}
