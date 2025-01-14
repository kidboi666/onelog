import { Module } from '@nestjs/common';
import { TodoFoldersController } from './todo-folders.controller';
import { TodoFoldersService } from './todo-folders.service';
import { todoFoldersProvider } from './todo-folders.provider';
import { DatabaseModule } from '../../config/database.module';

@Module({
  imports: [DatabaseModule],
  controllers: [TodoFoldersController],
  providers: [...todoFoldersProvider, TodoFoldersService],
  exports: [TodoFoldersService],
})
export class TodoFoldersModule {}
