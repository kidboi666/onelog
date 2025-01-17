import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Todo } from './todo.entity';
import { User } from './user.entity';

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

  @Column({ type: 'uuid' })
  userId: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User)
  user: User;

  @OneToMany(() => Todo, (todo) => todo.folder)
  todos: Todo[];
}
