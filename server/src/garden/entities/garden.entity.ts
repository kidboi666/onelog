import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from '../../user_info/entities/user-info.entity';

@Entity()
export class Garden {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  posts: number;

  @Column()
  user_id: number;

  @Column()
  year_month: string;

  @ManyToOne(() => UserInfo)
  user: UserInfo;
}
