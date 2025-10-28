import type { SupabaseClient } from "@supabase/supabase-js";
import * as commentApi from "@/entities/comment/api/comment-api";
import type { ICreateComment, IUpdateComment } from "@/entities/comment/api/dtos";

/**
 * 댓글 생성
 */
export const createComment = (params: ICreateComment, supabase?: SupabaseClient) => {
  return commentApi.createComment(params, supabase);
};

/**
 * 댓글 삭제
 */
export const deleteComment = (commentId: number, supabase?: SupabaseClient) => {
  return commentApi.deleteComment(commentId, supabase);
};

/**
 * 댓글 수정
 */
export const updateComment = (params: IUpdateComment, supabase?: SupabaseClient) => {
  return commentApi.updateComment(params, supabase);
};
