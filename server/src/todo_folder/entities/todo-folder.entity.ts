import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from '../../todo/entities/todo.entity';
import { UserInfo } from '../../user_info/entities/user-info.entity';

@Entity()
export class TodoFolder {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  color: string;

  @Column()
  index: number;

  @Column()
  name: string;

  @Column()
  user_id: number;

  @ManyToOne(() => UserInfo)
  user: UserInfo;

  @OneToMany(() => Todo, (todo) => todo.folder)
  todos: Todo[];
}
