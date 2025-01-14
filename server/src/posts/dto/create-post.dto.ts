import { PostType } from '../enums/post-type.enum';
import { AccessType } from '../enums/access-type.enum';
import {
  IsArray,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { EmotionLevel } from '../enums/emotion-level.enum';

export class createPostDto {
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
