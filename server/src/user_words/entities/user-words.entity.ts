import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserInfo } from '../../user_info/entities/user-info.entity';

@Entity()
export class UserWords {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column('simple-array')
  words: string[];

  @Column()
  user_id: number;

  @ManyToOne(() => UserInfo)
  user: UserInfo;
}
