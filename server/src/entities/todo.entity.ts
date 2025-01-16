import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TodoFolder } from './todo-folder.entity';
import { User } from './user.entity';

@Entity('todos')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  folderId: number;

  @Column()
  index: number;

  @Column()
  isComplete: boolean;

  @Column({ nullable: true })
  memo: string;

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

  @ManyToOne(() => TodoFolder)
  folder: TodoFolder;
}
