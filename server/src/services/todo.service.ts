import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Todo } from '../entities/todo.entity';
import { DATA_SOURCE } from '../constants/index.constant';

@Injectable()
export class TodoService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.TODO)
    private todoRepository: Repository<Todo>,
  ) {}
}
