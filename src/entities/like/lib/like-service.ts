import type { SupabaseClient } from "@supabase/supabase-js";
import * as likeApi from "@/entities/like/api/like-api";
import type { ILike } from "@/entities/like/model/types";

/**
 * 좋아요 토글 처리
 * isLike가 true면 좋아요 취소, false면 좋아요 추가
 */
export const handleLike = async (params: ILike, supabase?: SupabaseClient) => {
  if (params.isLike) {
    // 이미 좋아요한 상태 -> 좋아요 취소
    await likeApi.deleteLike(params.postId, params.meId, supabase);
  } else {
    // 좋아요하지 않은 상태 -> 좋아요 추가
    await likeApi.createLike(params.postId, params.meId, supabase);
  }
};
