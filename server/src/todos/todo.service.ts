import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from './todo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo) private todoRepository: Repository<Todo>,
  ) {}
}
