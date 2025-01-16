import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('messages')
export class Message {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  from: number;

  @Column()
  to: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.sentMessages)
  fromUser: User;

  @ManyToOne(() => User, (user) => user.receivedMessages)
  toUser: User;
}
