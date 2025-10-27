import type { IComment } from "@/entities/comment/model/types";
import type { Access, EmotionLevel, PostType } from "@/shared/types/enums";

/**
 * Base Entity
 */
interface IBasePost {
  id: number;
  tags: string[] | null;
  title: string | null;
  userId: string;
  createdAt: string;
  content: string;
  postType: PostType;
  accessType: Access;
  emotionLevel: EmotionLevel | null;
  userInfo: {
    userName: string | null;
    email: string;
    avatarUrl: string | null;
    aboutMe: string | null;
  };
}

export interface IPost extends IBasePost {
  isLiked: { like: string }[] | [];
  likeCount: { count: number }[] | [];
  commentCount: { count: number }[] | [];
}

export interface IPostDetail extends IPost {
  comments: IComment[] | [];
}

export interface ILikedPost extends Omit<IPost, "is_liked"> {
  post: IPost;
}
