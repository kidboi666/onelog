import type { userInfo } from "@/db/schema";

export type UserInfo = typeof userInfo.$inferSelect;
