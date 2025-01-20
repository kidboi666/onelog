import { IsArray, IsEnum, IsOptional, IsString, IsUUID } from 'class-validator';
import { AccessType, EmotionLevel, PostType } from '../../types/enums.type';

export class CreatePostDto {
  @IsUUID()
  userId: string;

  @IsEnum(PostType, {
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

  @IsEnum(AccessType, {
    message: 'Access type must be one of the allowed values: public, private',
  })
  accessType: AccessType;

  @IsOptional()
  @IsString()
  title: string;

  @IsString()
  content: string;
}
