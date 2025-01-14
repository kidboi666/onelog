import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from '../../user_info/entities/user-info.entity';

@Entity()
export class Follow {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  follower_user_id: number;

  @Column()
  followed_user_id: number;

  @ManyToOne(() => UserInfo, (user) => user.following)
  follower: UserInfo;

  @ManyToOne(() => UserInfo, (user) => user.followers)
  followed: UserInfo;
}
