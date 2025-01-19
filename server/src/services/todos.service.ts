import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from '../dtos/request/create-todo.dto';
import { UpdateTodoDto } from '../dtos/request/update-todo.dto';
import { FindTodoByFolderIdDto } from '../dtos/request/find-todo-by-user-id.dto';
import { FindTodoByIncompleteDto } from '../dtos/request/find-todo-by-completed.dto';
import { ExceptionUtil } from '../helpers/exception-condition.util';

@Injectable()
export class TodosService extends ExceptionUtil<Todo> {
  constructor(
    @InjectRepository(Todo)
    repo: Repository<Todo>,
  ) {
    super(repo);
  }

  async findByIncomplete(dto: FindTodoByIncompleteDto): Promise<Todo[]> {
    const { userId } = dto;
    return await this.findOrFail({ userId, isComplete: false });
  }

  async findByFolderId(dto: FindTodoByFolderIdDto): Promise<Todo[]> {
    return await this.findOrFail(dto);
  }

  async create(dto: CreateTodoDto): Promise<Todo> {
    const todo = this.repo.create(dto);
    return await this.repo.save(todo);
  }

  async update(id: number, dto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findOneOrFail({ id });
    Object.assign(todo, dto);
    return await this.repo.save(todo);
  }

  async updateIndex(id: number, index: number) {
    const todo = await this.findOneOrFail({ id });
    Object.assign(todo, { index });
    return await this.repo.save(todo);
  }

  async delete(id: number): Promise<void> {
    const todo = await this.findOneOrFail({ id });
    await this.repo.remove(todo);
  }
}
