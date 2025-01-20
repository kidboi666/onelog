import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
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
  async findByIncomplete(@Req() req: any): Promise<Todo[]> {
    return await this.todosService.findByIncompleteTodos(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Get('/:folder_id')
  async findByFolder(
    @Req() req: any,
    @Param('folder_id') folderId: string,
  ): Promise<Todo[]> {
    return await this.todosService.findTodosByFolderId({
      folderId: parseInt(folderId),
      userId: req.user.sub,
    });
  }

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() dto: CreateTodoDto): Promise<Todo> {
    return await this.todosService.createTodo(dto);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async update(@Param('id') id: string, @Body() dto: UpdateTodoDto) {
    return await this.todosService.updateTodo(parseInt(id), dto);
  }

  @UseGuards(AuthGuard)
  @Patch('/:id')
  async updateIndex(@Param('id') id: string, @Query('index') index: string) {
    return await this.todosService.updateTodoIndex(
      parseInt(id),
      parseInt(index),
    );
  }

  @UseGuards(AuthGuard)
  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return await this.todosService.deleteTodo(parseInt(id));
  }
}
