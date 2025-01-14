import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { todoProvider } from './todo.provider';
import { DatabaseModule } from '../../config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoController],
  providers: [...todoProvider, TodoService],
  exports: [TodoService],
})
export class TodoModule {}
