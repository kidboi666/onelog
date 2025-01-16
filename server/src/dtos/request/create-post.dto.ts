import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { AccessType, EmotionLevel, PostType } from '../../types/enum.type';

export class CreatePostDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsEnum(PostType)
  postType: PostType;

  @IsOptional()
  @IsEnum(EmotionLevel)
  emotionLevel: EmotionLevel;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsNotEmpty()
  @IsEnum(AccessType)
  accessType: AccessType;

  @IsOptional()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
