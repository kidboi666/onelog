import type { articles } from "@/db/schema";
import type { UserInfo } from "@/entities/user/user.model";

export type Article = typeof articles.$inferSelect;
export type ArticleWithAuthorInfo = Article & { author: UserInfo | null };
export type ArticleInsertSchema = typeof articles.$inferInsert;
export type InfiniteArticleList = {
  data: ArticleWithAuthorInfo[];
  previousId?: string;
  nextId?: string;
};
export type AccessType = "public" | "private" | "friends";

export const PAGE_LIMIT = 10;

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
