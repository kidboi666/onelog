import { IsNumber, IsOptional, IsString, IsUUID } from 'class-validator';

export class CreateTodoDto {
  @IsNumber()
  folderId: number;

  @IsNumber()
  index: number;

  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  memo: string;

  @IsUUID()
  userId: string;
}
