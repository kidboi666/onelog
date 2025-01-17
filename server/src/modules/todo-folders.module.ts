import { Module } from '@nestjs/common';
import { TodoFoldersController } from '../controllers/todo-folders.controller';
import { TodoFoldersService } from '../services/todo-folders.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoFolder } from '../entities/todo-folder.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoFolder])],
  controllers: [TodoFoldersController],
  providers: [TodoFoldersService],
})
export class TodoFoldersModule {}
