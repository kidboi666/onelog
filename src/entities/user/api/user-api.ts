import type { SupabaseClient } from "@supabase/supabase-js";
import type { IUserInfo } from "@/entities/user/model/types";
import { createBrowserClient } from "@/shared/lib/supabase/create-browser-client";
import { processQuery } from "@/shared/lib/supabase/helpers";

// 대상 유저 정보 가져오기
export const getUserInfo = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const query = supabase.from("user_info").select().eq("id", userId).single();
  return processQuery<IUserInfo>(query);
};
