import type { SupabaseClient } from "@supabase/supabase-js";
import * as wordApi from "@/entities/word/api/word-api";

/**
 * 대상 유저가 쓴 단어들 가져오기
 */
export const getMyUsedWords = (userId: string, supabase?: SupabaseClient) => {
  return wordApi.getMyUsedWords(userId, supabase);
};

/**
 * 사전에서 단어 찾기
 */
export const getUsedWords = (word: string, supabase?: SupabaseClient) => {
  return wordApi.getUsedWords(word, supabase);
};
