export const POST_QUERY_KEY = {
  PUBLIC: ["all_post"],
  LIKED: (authorId?: string | null, meId?: string | null) => [
    "post",
    "liked",
    authorId,
    meId,
  ],
  THAT_DAY: (
    startOfDay?: string | null,
    endOfDay?: string | null,
    authorId?: string | null,
  ) => ["post", startOfDay, endOfDay, authorId],
  POST_TYPE: (postType?: "journal" | "article", authorId?: string | null) => [
    "post",
    postType,
    authorId,
  ],
  DETAIL: (postId?: number) => ["post", postId],
  CHECK_LIKED: (postId?: number, meId?: string | null) => [
    "post",
    "isLiked",
    postId,
    meId,
  ],
  COUNT: {
    LIKED: (userId: string) => ["count", "post", userId],
    TOTAL: (userId: string) => ["count", "allPost", userId],
    POST_TYPE: (userId: string, postType?: "journal" | "article") => [
      "count",
      "post",
      postType,
      userId,
    ],
  },

  GARDEN: (userId: string, selectedYear?: number) => [
    "garden",
    userId,
    selectedYear,
  ],
};

export const POST_SUPABASE_QUERY = {
  GET_POSTS_WITH_AUTHOR_INFO:
    "*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), user_info(email, user_name, avatar_url, about_me)",
  GET_LIKED_POSTS_WITH_AUTHOR_INFO:
    "*, post!like_post_id_fkey(*, comment_count:comment(count), liked_count:like(count), user_info(user_name, avatar_url, email, about_me))",
  GET_POST_DETAIL_WITH_AUTHOR_INFO_AND_COMMENTS:
    "*, comment_count:comment(count), is_liked:like(user_id), like_count:like(count), comments:comment(*, user_info(email, user_name, avatar_url, about_me)), user_info(email, user_name, avatar_url, about_me)",
} as const;

export const POST_TOAST_MESSAGE = {
  POST: {
    SUCCESS: "게시물 업로드에 성공했습니다.",
    EXCEPTION: "게시물 업로드에 실패했습니다.",
  },
  UPDATE: {
    SUCCESS: "게시물 수정에 성공했습니다.",
    EXCEPTION: "게시물 업로드에 실패했습니다.",
  },
  DELETE: {
    SUCCESS: "게시물 삭제에 성공했습니다.",
    EXCEPTION: "게시물 삭제에 실패했습니다.",
  },
};
