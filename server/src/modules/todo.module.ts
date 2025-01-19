import { Module } from '@nestjs/common';
import { TodosController } from '../controllers/todos.controller';
import { TodosService } from '../services/todos.service';
import { Todo } from '../entities/todo.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Todo])],
  controllers: [TodosController],
  providers: [TodosService],
  exports: [TodosService],
})
export class TodoModule {}
