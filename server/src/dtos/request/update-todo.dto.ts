import { IsBoolean, IsOptional, IsString, IsUUID } from 'class-validator';

export class UpdateTodoDto {
  @IsOptional()
  @IsString()
  content: string;

  @IsOptional()
  @IsString()
  memo: string;

  @IsBoolean()
  @IsOptional()
  isComplete: boolean;

  @IsUUID()
  userId: string;
}
