import {
  AfterInsert,
  AfterRemove,
  AfterUpdate,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { Message } from './message.entity';
import { Follow } from './follow.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  avatarUrl: string;

  @Column({ nullable: true })
  userName: string;

  @Column({ nullable: true })
  aboutMe: string;

  @Column({ nullable: true })
  mbti: string;

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

  @AfterInsert()
  logInsert() {
    console.log('Inserted user with id : ', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated user with id : ', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed user with id : ', this.id);
  }
}
