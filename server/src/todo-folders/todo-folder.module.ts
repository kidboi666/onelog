import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoFolder } from './todo-folder.entity';
import { TodoFolderController } from './todo-folder.controller';
import { TodoFolderService } from './todo-folder.service';

@Module({
  imports: [TypeOrmModule.forFeature([TodoFolder])],
  controllers: [TodoFolderController],
  providers: [TodoFolderService],
  exports: [TodoFolderService],
})
export class TodoFolderModule {}
