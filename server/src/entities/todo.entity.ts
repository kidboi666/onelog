import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
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

  @Column({ name: 'folder_id' })
  folderId: number;

  @Column()
  index: number;

  @Column({ name: 'is_complete', default: false })
  isComplete: boolean;

  @Column({ nullable: true })
  memo: string;

  @Column()
  content: string;

  @Column({ name: 'user_id', type: 'uuid' })
  userId: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamptz' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamptz' })
  updatedAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => TodoFolder)
  @JoinColumn({ name: 'folder_id', referencedColumnName: 'id' })
  folder: TodoFolder;
}
