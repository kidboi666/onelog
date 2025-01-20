import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTodoDto } from '../dtos/request/create-todo.dto';
import { UpdateTodoDto } from '../dtos/request/update-todo.dto';
import { FindTodoByFolderIdDto } from '../dtos/request/find-todo-by-user-id.dto';
import { FindTodoByIncompleteDto } from '../dtos/request/find-todo-by-completed.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly repository: Repository<Todo>,
  ) {}

  async findByIncompleteTodos(dto: FindTodoByIncompleteDto): Promise<Todo[]> {
    const { userId } = dto;
    const todos = await this.repository.findBy({
      userId,
      isComplete: false,
    });
    this.validateTodosExist(todos);
    return todos;
  }

  async findTodosByFolderId(dto: FindTodoByFolderIdDto): Promise<Todo[]> {
    const todos = await this.repository.findBy(dto);
    this.validateTodosExist(todos);
    return todos;
  }

  async createTodo(dto: CreateTodoDto): Promise<Todo> {
    const todo = this.repository.create(dto);
    return await this.repository.save(todo);
  }

  async updateTodo(id: number, dto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.findTodoById(id);
    const updatedTodo = Object.assign(todo, dto);
    return await this.repository.save(updatedTodo);
  }

  async updateTodoIndex(id: number, index: number) {
    const todo = await this.findTodoById(id);
    const updatedTodo = Object.assign(todo, { index });
    return await this.repository.save(updatedTodo);
  }

  async deleteTodo(id: number): Promise<void> {
    const todo = await this.findTodoById(id);
    await this.repository.remove(todo);
  }

  private async findTodoById(id: number): Promise<Todo> {
    const todo = await this.repository.findOneBy({ id });

    if (!todo) {
      throw new NotFoundException(`not found todo. (id: ${id}`);
    }

    return todo;
  }

  private validateTodosExist(todos: Todo[]): void {
    if (todos.length === 0) {
      throw new NotFoundException('not found todo list');
    }
  }
}
