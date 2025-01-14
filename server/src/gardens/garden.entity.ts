import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../users/user.entity';

@Entity('gardens')
export class Garden {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  posts: number;

  @Column()
  userId: number;

  @Column()
  yearMonth: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;
}
