import { IsNumber, IsUUID } from 'class-validator';

export class FindTodoByFolderIdDto {
  @IsUUID()
  userId: string;

  @IsNumber()
  folderId: number;
}
