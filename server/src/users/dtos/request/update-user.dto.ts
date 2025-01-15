import { IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  avatarUrl: string;

  @IsOptional()
  @IsString()
  userName: string;

  @IsOptional()
  @IsString()
  aboutMe: string;

  @IsOptional()
  @IsString()
  mbti: string;
}
