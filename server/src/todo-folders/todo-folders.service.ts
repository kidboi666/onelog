import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoFolder } from './todo-folder.entity';
import { DATA_SOURCE } from '../../constants/data-source';

@Injectable()
export class TodoFoldersService {
  constructor(
    @Inject(DATA_SOURCE.REPOSITORIES.TODO_FOLDER)
    private todoFolderRepository: Repository<TodoFolder>,
  ) {}
}
