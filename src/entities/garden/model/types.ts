// @ts-expect-error
import type { Json } from "@supabase/postgrest-js/src/select-query-parser/types";

export interface IGarden {
  created_at: string;
  id: number;
  posts: Json[] | null;
  user_id: string;
  year_month: string;
}
