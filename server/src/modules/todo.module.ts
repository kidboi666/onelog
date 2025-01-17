import { Module } from '@nestjs/common';
import { TodoController } from '../controllers/todo.controller';
import { TodoService } from '../services/todo.service';
import { Todo } from '../entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodoController],
  providers: [TodoService],
  exports: [TodoService],
})
export class TodoModule {}
