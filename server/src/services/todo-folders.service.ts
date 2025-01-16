import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoFolder } from '../entities/todo-folder.entity';
import { DATA_SOURCE } from '../constants/index.constant';

@Injectable()
export class TodoFoldersService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.TODO_FOLDER)
    private todoFolderRepository: Repository<TodoFolder>,
  ) {}
}
