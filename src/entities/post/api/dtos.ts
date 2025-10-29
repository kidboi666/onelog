import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { Access, EmotionLevel, PostType } from "@/shared/types/enums";

export interface IGetAllPosts {
  meId?: string | null;
  pageParam: number;
  limit: number;
}

export interface IGetPost {
  postId: number;
  meId?: string | null;
}

export interface IGetLikedPosts {
  authorId: string;
  meId?: string | null;
  pageParam: number;
  limit: number;
}

export interface IGetUserPostsThatDay {
  authorId: string;
  startOfDay: string | null;
  endOfDay: string | null;
  meId?: string | null;
}

export interface IGetAllUserPosts {
  authorId: string;
  postType: PostType;
  pageParam: number;
  limit: number;
  meId?: string | null;
}

export interface ICreatePost {
  title: string | null;
  content: string;
  emotionLevel: EmotionLevel | null;
  tags: string[];
  accessType: Access;
  postType: PostType;
  meId: string;
}

export interface IUpdatePost {
  id: number;
  meId: string;
  title: string | null;
  content: string;
  emotionLevel: EmotionLevel | null;
  tags: string[];
  accessType: Access;
  postType: PostType;
}

export interface IUpdatePostFormStates {
  emotionLevel: EmotionLevel | null;
  accessType: Access;
  postType: PostType;
  content: string;
  title: string | null;
  tags: string[];
}

export interface IUpdatePostFormActions {
  onChangeEmotion: (emotionLevel: EmotionLevel | null) => void;
  onChangeAccessType: (accessType: Access) => void;
  onChangePostType: (postType: PostType) => void;
  setContent: Dispatch<SetStateAction<string>>;
  onChangeTitle: (e: ChangeEvent<HTMLInputElement>) => void;
  setTags: Dispatch<SetStateAction<string[]>>;
}
