import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { TodoFoldersService } from '../services/todo-folders.service';
import { CreateTodoFolderDto } from '../dtos/request/create-todo-folder.dto';
import { TodoFolder } from '../entities/todo-folder.entity';
import { UpdateTodoFolderDto } from '../dtos/request/update-todo-folder.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('todo_folders')
export class TodoFoldersController {
  constructor(private readonly todoFolderService: TodoFoldersService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createTodoFolderDto: CreateTodoFolderDto,
  ): Promise<TodoFolder> {
    return await this.todoFolderService.create(createTodoFolderDto);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(
    @Param('id') id: number,
    @Body() updateTodoFolderDto: UpdateTodoFolderDto,
  ) {
    return await this.todoFolderService.update(id, updateTodoFolderDto);
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: number) {
    return await this.todoFolderService.delete(id);
  }
}
