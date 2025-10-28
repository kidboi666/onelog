import type { SupabaseClient } from "@supabase/supabase-js";
import * as followApi from "@/entities/follow/api/follow-api";
import type { ICreateFollow, IDeleteFollow } from "@/entities/follow/api/dtos";

/**
 * 팔로워 목록 가져오기
 */
export const getFollowers = (userId: string, supabase?: SupabaseClient) => {
  return followApi.getFollowers(userId, supabase);
};

/**
 * 팔로잉 목록 가져오기
 */
export const getFollowings = (userId: string, supabase?: SupabaseClient) => {
  return followApi.getFollowings(userId, supabase);
};

/**
 * 팔로워 수 가져오기
 */
export const getFollowersCount = (userId: string, supabase?: SupabaseClient) => {
  return followApi.getFollowersCount(userId, supabase);
};

/**
 * 팔로잉 수 가져오기
 */
export const getFollowingsCount = (userId: string, supabase?: SupabaseClient) => {
  return followApi.getFollowingsCount(userId, supabase);
};

/**
 * 팔로우 생성
 */
export const createFollow = (params: ICreateFollow, supabase?: SupabaseClient) => {
  return followApi.createFollow(params, supabase);
};

/**
 * 팔로우 삭제
 */
export const deleteFollow = (params: IDeleteFollow, supabase?: SupabaseClient) => {
  return followApi.deleteFollow(params, supabase);
};

/**
 * 팔로우 토글 처리
 * isFollowing이 true면 팔로우 취소, false면 팔로우 추가
 */
export const handleFollow = async (
  followedUserId: string,
  followerUserId: string,
  isFollowing: boolean,
  supabase?: SupabaseClient,
) => {
  if (isFollowing) {
    // 이미 팔로우한 상태 -> 팔로우 취소
    await followApi.deleteFollow({ followedUserId, followerUserId }, supabase);
    return null;
  } else {
    // 팔로우하지 않은 상태 -> 팔로우 추가
    return followApi.createFollow({ followedUserId, followerUserId }, supabase);
  }
};
