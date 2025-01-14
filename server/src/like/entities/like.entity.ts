import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { UserInfo } from '../../user_info/entities/user-info.entity';

@Entity()
export class Like {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  user_id: number;

  @Column()
  post_id: number;

  @ManyToOne(() => UserInfo)
  user: UserInfo;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;
}
