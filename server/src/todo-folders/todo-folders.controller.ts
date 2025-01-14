import { Controller } from '@nestjs/common';
import { TodoFoldersService } from './todo-folders.service';

@Controller('todo_folders')
export class TodoFoldersController {
  constructor(private readonly todoFolderService: TodoFoldersService) {}
}
