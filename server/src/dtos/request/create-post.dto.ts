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

ž  @IsEnum(PostType, {
    message: 'Post type must be one of the allowed values: journal, article',
  })
  postType: PostType;

  @IsOptional()
  @IsEnum(EmotionLevel, {
    message:
      'Emotion level must be one of the allowed values: 0%, 25%, 50%, 75%, 100%',
  })
  emotionLevel: EmotionLevel;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsNotEmpty()
  @IsEnum(AccessType, {
    message: 'Access type must be one of the allowed values: public, private',
  })
  accessType: AccessType;

  @IsOptional()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
