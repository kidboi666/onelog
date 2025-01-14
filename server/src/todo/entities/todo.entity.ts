import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TodoFolder } from '../../todo_folder/entities/todo-folder.entity';
import { UserInfo } from '../../user_info/entities/user-info.entity';

@Entity()
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  folder_id: number;

  @Column()
  index: number;

  @Column()
  is_complete: boolean;

  @Column({ nullable: true })
  memo: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  updated_at: Date;

  @Column()
  user_id: number;

  @ManyToOne(() => UserInfo)
  user: UserInfo;

  @ManyToOne(() => TodoFolder)
  folder: TodoFolder;
}
