import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from '../../user_info/entities/user-info.entity';
import { Comment } from '../../comment/entities/comment.entity';
import { Like } from '../../like/entities/like.entity';

@Entity()
export class Post {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  user_id: number;

  @Column()
  post_type: string;

  @Column({ nullable: true })
  emotion_level: string;

  @Column()
  content: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column({ nullable: true })
  access_type: string;

  @Column({ nullable: true })
  title: string;

  @ManyToOne(() => UserInfo, (user) => user.posts)
  user: UserInfo;

  @OneToMany(() => Comment, (comment) => comment.post)
  comments: Comment[];

  @OneToMany(() => Like, (like) => like.post)
  likes: Like[];
}
