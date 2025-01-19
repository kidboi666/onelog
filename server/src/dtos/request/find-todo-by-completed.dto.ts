import { IsUUID } from 'class-validator';

export class FindTodoByIncompleteDto {
  @IsUUID()
  userId: string;
}
