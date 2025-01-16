import { Module } from '@nestjs/common';
import { TodoFoldersController } from '../controllers/todo-folders.controller';
import { TodoFoldersService } from '../services/todo-folders.service';
import { todoFoldersProvider } from '../providers/todo-folders.provider';
import { DatabaseModule } from '../config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoFoldersController],
  providers: [...todoFoldersProvider, TodoFoldersService],
  exports: [TodoFoldersService],
})
export class TodoFoldersModule {}
