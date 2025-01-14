import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TodoFolder } from './todo-folder.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoFolderService {
  constructor(
    @InjectRepository(TodoFolder)
    private todoFolderRepository: Repository<TodoFolder>,
  ) {}
}
