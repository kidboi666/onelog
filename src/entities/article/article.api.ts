import { desc, eq, getTableColumns } from "drizzle-orm";
import { db } from "@/db";
import { articles, userInfo } from "@/db/schema";
import type {
  ArticleInsertSchema,
  ArticleWithAuthorInfo,
} from "@/entities/article/article.model";

type AllParams = {
  limit: number;
  offset: number;
};

type PostParams = ArticleInsertSchema;

export const articleApi = {
  all: async ({
    limit,
    offset,
  }: AllParams): Promise<ArticleWithAuthorInfo[]> => {
    return db
      .select({
        ...getTableColumns(articles),
        author: userInfo,
      })
      .from(articles)
      .leftJoin(userInfo, eq(articles.userId, userInfo.id))
      .orderBy(desc(articles.createdAt))
      .limit(limit)
      .offset(offset)
      .then((rows) =>
        rows.map((row) => ({
          ...row,
          author: row.author?.id ? row.author : null,
        })),
      );
  },

  get: async (id: string): Promise<ArticleWithAuthorInfo> => {
    return db
      .select({
        ...getTableColumns(articles),
        author: userInfo,
      })
      .from(articles)
      .where(eq(articles.id, id))
      .leftJoin(userInfo, eq(articles.userId, userInfo.id))
      .then((rows) => {
        const [row] = rows;
        return {
          ...row,
          author: row.author?.id ? row.author : null,
        };
      });
  },

  post: async (params: PostParams) => {
    return db.insert(articles).values(params).returning();
  },

  delete: async (id: string) => {
    return db.delete(articles).where(eq(articles.id, id));
  },
};
