import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('follows')
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'follower_user_id', type: 'uuid' })
  followerUserId: string;

  @Column({ name: 'followed_user_id', type: 'uuid' })
  followedUserId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.following)
  @JoinColumn({ name: 'follower_user_id', referencedColumnName: 'id' })
  follower: User;

  @ManyToOne(() => User, (user) => user.followers)
  @JoinColumn({ name: 'followed_user_id', referencedColumnName: 'id' })
  followed: User;
}
