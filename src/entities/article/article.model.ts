import type { articles } from "@/db/schema";
import type { UserInfo } from "@/entities/user/user.model";

export type Article = typeof articles.$inferSelect;
export type ArticleWithAuthorInfo = Article & { author: UserInfo | null };
export type ArticleInsertSchema = typeof articles.$inferInsert;
