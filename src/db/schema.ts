import {
  boolean,
  integer,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { authUsers } from "drizzle-orm/supabase";

export const userInfo = pgTable("user_info", {
  id: uuid()
    .primaryKey()
    .references(() => authUsers.id), // Supabase Auth 연동
  user_name: text().notNull(),
  avatar_url: text(),
  about_me: text(),
  created_at: timestamp().defaultNow().notNull(),
});

export const posts = pgTable("posts", {
  id: uuid().primaryKey().defaultRandom(),
  user_id: uuid().references(() => userInfo.id),
  content: text().notNull(),
  emotion_level: integer().notNull(),
  is_public: boolean().default(true),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});
