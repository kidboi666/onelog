import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { articles, userInfo } from "@/db/schema";

const schema = {
  ...userInfo,
  ...articles,
};

const sql = postgres(process.env.DATABASE_URL!, { prepare: false });
export const db = drizzle(sql, { schema });
