import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from '../../user_info/entities/user-info.entity';

@Entity()
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => UserInfo, (user) => user.sentMessages)
  fromUser: UserInfo;

  @ManyToOne(() => UserInfo, (user) => user.receivedMessages)
  toUser: UserInfo;
}
