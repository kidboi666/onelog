import type { SupabaseClient } from "@supabase/supabase-js";
import { postApi } from "@/entities/post/api/api";
import type {
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
} from "@/entities/post/api/dtos";
import {
  filterPrivateLikedPosts,
  filterPrivatePosts,
  isCurrentUserAuthor,
  parseEmotionLevel,
} from "@/entities/post/lib/helpers";
import type { ILikedPost, IPost, IPostDetail } from "@/entities/post/model/types";
import { calculateAverage } from "@/shared/utils/calculate";

/**
 * 모든 공개 게시물 가져오기 (데이터 처리 포함)
 */
export const getAllPostsWithProcessing = async (
  params: IGetAllPosts,
  supabase?: SupabaseClient,
): Promise<IPost[]> => {
  return postApi.getAllPosts(params, supabase);
};

/**
 * 좋아요한 게시물 가져오기 (권한에 따른 필터링 포함)
 */
export const getLikedPostsWithProcessing = async (
  params: IGetLikedPosts,
  supabase?: SupabaseClient,
): Promise<ILikedPost[]> => {
  const data = await postApi.getLikedPosts(params, supabase);
  const isMe = isCurrentUserAuthor(params.authorId, params.meId);
  return filterPrivateLikedPosts(data, isMe);
};

/**
 * 특정 게시물 상세 정보 가져오기
 */
export const getPostWithProcessing = async (
  params: IGetPost,
  supabase?: SupabaseClient,
): Promise<IPostDetail | null> => {
  return postApi.getPost(params, supabase);
};

/**
 * 특정 날짜의 유저 게시물 가져오기 (권한에 따른 필터링 포함)
 */
export const getUserPostsThatDayWithProcessing = async (
  params: IGetUserPostsThatDay,
  supabase?: SupabaseClient,
): Promise<IPost[]> => {
  const data = await postApi.getUserPostsThatDay(params, supabase);
  const isMe = isCurrentUserAuthor(params.authorId, params.meId);
  return filterPrivatePosts(data, isMe);
};

/**
 * 유저의 모든 게시물 가져오기 (권한에 따른 필터링 포함)
 */
export const getUserPostsWithProcessing = async (
  params: IGetAllUserPosts,
  supabase?: SupabaseClient,
): Promise<IPost[]> => {
  const data = await postApi.getUserPosts(params, supabase);
  const isMe = isCurrentUserAuthor(params.authorId, params.meId);
  return filterPrivatePosts(data, isMe);
};

/**
 * 주어진 사용자에 대한 감정 평균치 계산
 */
export const getEmotionAverage = async (
  userId: string,
  supabase?: SupabaseClient,
): Promise<number> => {
  const data = await postApi.getEmotionLevels(userId, supabase);

  if (!data || data.length === 0) {
    return 0;
  }

  const emotionLevels = data.map((item) =>
    parseEmotionLevel(item.emotion_level),
  );
  return calculateAverage(emotionLevels);
};

/**
 * 게시물 삭제
 */
export const deletePost = async (
  postId: number,
  supabase?: SupabaseClient,
): Promise<void> => {
  return postApi.deletePost(postId, supabase);
};
