import type { SupabaseClient } from "@supabase/supabase-js";
import * as userApi from "@/entities/user/api/user-api";

/**
 * 대상 유저 정보 가져오기
 */
export const getUserInfo = (userId: string, supabase?: SupabaseClient) => {
  return userApi.getUserInfo(userId, supabase);
};
