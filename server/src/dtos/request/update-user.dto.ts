import {
  IsEnum,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { MbtiType } from '../../types/enums.type';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MaxLength(200)
  avatarUrl: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(20)
  userName: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  aboutMe: string;

  @IsOptional()
  @IsString()
  @IsEnum(MbtiType)
  mbti: string;
}
