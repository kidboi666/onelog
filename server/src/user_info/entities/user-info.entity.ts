import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { Message } from '../../message/entities/message.entity';
import { Follow } from '../../follow/entities/follow.entity';

@Entity()
export class UserInfo {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatar_url: string;

  @Column({ nullable: true })
  user_name: string;

  @Column({ nullable: true })
  about_me: string;

  @Column({ nullable: true })
  mbti: string;

  @Column({ nullable: true })
  favorite_words: string;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @OneToMany(() => Message, (message) => message.from)
  sentMessages: Message[];

  @OneToMany(() => Message, (message) => message.to)
  receivedMessages: Message[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.followed)
  followers: Follow[];
}
