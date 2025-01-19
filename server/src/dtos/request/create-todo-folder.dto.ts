import { IsNumber, IsString, IsUUID } from 'class-validator';

export class CreateTodoFolderDto {
  @IsString()
  color: string;

  @IsNumber()
  index: number;

  @IsString()
  name: string;

  @IsUUID()
  userId: string;
}
