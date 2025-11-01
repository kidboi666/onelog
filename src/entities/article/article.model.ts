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
export type AccessType = "public" | "private";

export const PAGE_LIMIT = 10;

export const EMOTION_STATUS = [
  { percent: 0, status: "매우 나쁨" },
  { percent: 25, status: "나쁨" },
  { percent: 50, status: "보통" },
  { percent: 75, status: "좋음" },
  { percent: 100, status: "매우 좋음" },
] as const;

export type EmotionLevel = (typeof EMOTION_STATUS)[number]["percent"];

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
