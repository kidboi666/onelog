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
  id: uuid("id")
    .primaryKey()
    .references(() => authUsers.id), // Supabase Auth 연동
  email: text("email").notNull(),
  userName: text("user_name").notNull(),
  avatarUrl: text("avatar_url"),
  aboutMe: text("about_me"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const articles = pgTable("articles", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id").references(() => userInfo.id),
  content: text("content").notNull(),
  emotionLevel: integer("emotion_level").notNull(),
  isPublic: boolean("is_public").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});
