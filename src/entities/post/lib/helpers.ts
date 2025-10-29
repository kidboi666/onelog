import type { ILikedPost, IPost } from "@/entities/post/model/types";
import { Access } from "@/shared/types/enums";

// 현재 유저가 작성자인지 체크하는 헬퍼
export const isCurrentUserAuthor = (authorId: string, meId?: string | null) =>
  authorId === meId;

// private 좋아요 게시물 필터링
export const filterPrivateLikedPosts = (
  data: ILikedPost[] | null,
  isMe: boolean,
): ILikedPost[] => {
  if (!data) return [];
  return isMe
    ? data
    : data.map((item) =>
        item.post.accessType === Access.PUBLIC
          ? item
          : { ...item, post: { ...item.post, title: null, content: "" } },
      );
};

// private 게시물 필터링
export const filterPrivatePosts = (data: IPost[], isMe: boolean): IPost[] => {
  if (!data) return [];
  return isMe
    ? data
    : data.map((item) =>
        item.accessType === Access.PUBLIC
          ? item
          : { ...item, title: null, content: "" },
      );
};

