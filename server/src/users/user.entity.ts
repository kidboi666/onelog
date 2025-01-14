import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from '../posts/post.entity';
import { Message } from '../messages/message.entity';
import { Follow } from '../follows/follow.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  aboutMe: string;

  @Column({ nullable: true })
  mbti: string;

  @Column({ nullable: true })
  favoriteWords: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

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
