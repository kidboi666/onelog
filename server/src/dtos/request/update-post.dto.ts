import { AccessType, EmotionLevel, PostType } from '../../types/enums.type';
import { IsArray, IsEnum, IsString } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  userId: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsEnum(EmotionLevel, {
    message:
      'Emotion level must be one of the allowed values: 0%, 25%, 50%, 75%, 100%',
  })
  emotionLevel: EmotionLevel;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsEnum(AccessType, {
    message: 'Access type must be one of the allowed values: public, private',
  })
  accessType: AccessType;

  @IsEnum(PostType, {
    message: 'Post type must be one of the allowed values: article, journal',
  })
  postType: PostType;
}
