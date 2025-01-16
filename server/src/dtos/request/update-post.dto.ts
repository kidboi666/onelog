import { AccessType, EmotionLevel, PostType } from '../../types/enum.type';

export class UpdatePostDto {
  userId: string;
  title: string;
  content: string;
  emotionLevel: EmotionLevel;
  tags: string[];
  accessType: AccessType;
  postType: PostType;
}
