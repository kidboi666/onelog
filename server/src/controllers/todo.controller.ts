import { Controller } from '@nestjs/common';
import { TodoService } from '../services/todo.service';

@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}
}
