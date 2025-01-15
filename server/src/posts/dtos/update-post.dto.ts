import { AccessType, EmotionLevel, PostType } from '../../enums';

export class UpdatePostDto {
  userId: string;
  title: string;
  content: string;
  emotionLevel: EmotionLevel;
  tags: string[];
  accessType: AccessType;
  postType: PostType;
}
