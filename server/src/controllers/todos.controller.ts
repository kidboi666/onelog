import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { TodosService } from '../services/todos.service';
import { CreateTodoDto } from '../dtos/request/create-todo.dto';
import { Todo } from '../entities/todo.entity';
import { UpdateTodoDto } from '../dtos/request/update-todo.dto';
import { AuthGuard } from '../guards/auth.guard';

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @UseGuards(AuthGuard)
  @Get()
  async findByIncomplete(@Session() session: any): Promise<Todo[]> {
    const userId = session.userId;
    return await this.todosService.findByIncomplete(userId);
  }

  @UseGuards(AuthGuard)
  @Get('/:folder_id')
  async findByFolder(
    @Param('folder_id') folderId: string,
    @Session() session: any,
  ): Promise<Todo[]> {
    const userId = session.userId;
    return await this.todosService.findByFolderId({
      folderId: parseInt(folderId),
      userId,
    });
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateTodoDto): Promise<Todo> {
    return await this.todosService.create(dto);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return await this.todosService.update(parseInt(id), dto);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateIndex(@Param('id') id: string, @Query('index') index: string) {
    return await this.todosService.updateIndex(parseInt(id), parseInt(index));
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.todosService.delete(parseInt(id));
  }
}
