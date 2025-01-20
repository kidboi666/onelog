import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @OneToMany(() => Todo, (todo) => todo.folder)
  todos: Todo[];
}
