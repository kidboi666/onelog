import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from '../todos/todo.entity';
import { User } from '../users/user.entity';

@Entity('todo_folders')
export class TodoFolder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  color: string;

  @Column()
  index: number;

  @Column()
  name: string;

  @Column()
  userId: number;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Todo, (todo) => todo.folder)
  todos: Todo[];
}
