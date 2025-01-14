import { Controller } from '@nestjs/common';
import { TodoFolderService } from './todo-folder.service';

@Controller('todo_folders')
export class TodoFolderController {
  constructor(private readonly todoFolderService: TodoFolderService) {}
}
