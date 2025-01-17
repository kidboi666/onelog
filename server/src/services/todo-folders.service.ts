import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoFolder } from '../entities/todo-folder.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoFoldersService {
  constructor(
    @InjectRepository(TodoFolder)
    private todoFolderRepository: Repository<TodoFolder>,
  ) {}
}
