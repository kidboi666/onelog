import { Module } from '@nestjs/common';
import { TodoController } from '../controllers/todo.controller';
import { TodoService } from '../services/todo.service';
import { todoProvider } from '../providers/todo.provider';
import { DatabaseModule } from '../config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [...todoProvider, TodoService],
  exports: [TodoService],
})
export class TodoModule {}
