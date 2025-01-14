import { EmotionLevel } from '../enums/emotion-level.enum';
import { AccessType } from '../enums/access-type.enum';
import { PostType } from '../enums/post-type.enum';

export class UpdatePostDto {
  userId: string;
  title: string;
  content: string;
  emotionLevel: EmotionLevel;
  tags: string[];
  accessType: AccessType;
  postType: PostType;
}
