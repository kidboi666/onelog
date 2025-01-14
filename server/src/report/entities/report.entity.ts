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
export class Report {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  reporter_id: number;

  @Column({ nullable: true })
  target_post_id: number;

  @Column()
  reason: string;

  @Column({ nullable: true })
  target_comment_id: number;

  @ManyToOne(() => UserInfo)
  reporter: UserInfo;

  @ManyToOne(() => Post)
  targetPost: Post;

  @ManyToOne(() => Comment)
  targetComment: Comment;
}
