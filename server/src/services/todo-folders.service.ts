import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoFolder } from '../entities/todo-folder.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoFolderDto } from '../dtos/request/create-todo-folder.dto';
import { UpdateTodoFolderDto } from '../dtos/request/update-todo-folder.dto';

@Injectable()
export class TodoFoldersService {
  constructor(
    @InjectRepository(TodoFolder)
    private repo: Repository<TodoFolder>,
  ) {}

  async create(createTodoFolderDto: CreateTodoFolderDto): Promise<TodoFolder> {
    const todo = this.repo.create(createTodoFolderDto);

    return await this.repo.save(todo);
  }

  async update(
    id: number,
    updateTodoFolderDto: UpdateTodoFolderDto,
  ): Promise<TodoFolder> {
    const todo = await this.repo.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException('Not found todo');
    }

    Object.assign(todo, updateTodoFolderDto);
    return await this.repo.save(todo);
  }

  async delete(id: number): Promise<void> {
    const todo = await this.repo.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException('Not found todo');
    }

    await this.repo.delete(todo);
  }
}
