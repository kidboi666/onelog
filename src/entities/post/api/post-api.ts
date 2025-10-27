import type { SupabaseClient } from "@supabase/supabase-js";
import {
  filterPrivateLikedPosts,
  filterPrivatePosts,
  isCurrentUserAuthor,
  parseEmotionLevel,
} from "@/entities/post/lib/helpers";
import { POST_SUPABASE_QUERY } from "@/entities/post/model/constants";
import type {
  ILikedPost,
  IPost,
  IPostDetail,
} from "@/entities/post/model/types";
import { createBrowserClient } from "@/shared/lib/supabase/create-browser-client";
import {
  addUserFilter,
  handleError,
  processQuery,
} from "@/shared/lib/supabase/helpers";
import { Access } from "@/shared/types/enums";
import { calculateAverage } from "@/shared/utils/calculate";
import type {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  IUpdatePost,
} from "./dtos";

// 모든 게시물 가져오기
export const getAllPosts = async (
  params: IGetAllPosts,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  let query = supabase
    .from("post")
    .select<string, IPost>(POST_SUPABASE_QUERY.GET_POSTS_WITH_AUTHOR_INFO)
    .eq("access_type", Access.PUBLIC)
    .order("created_at", { ascending: false })
    .range(params.pageParam, params.pageParam + params.limit - 1);

  query = addUserFilter(query, undefined, params.meId);
  return processQuery<IPost[]>(query);
};

// 좋아요한 게시물 가져오기
export const getLikedPosts = async (
  params: IGetLikedPosts,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  let query = supabase
    .from("like")
    .select<string, ILikedPost>(
      POST_SUPABASE_QUERY.GET_LIKED_POSTS_WITH_AUTHOR_INFO,
    )
    .order("created_at", { ascending: false })
    .range(params.pageParam, params.pageParam + params.limit - 1);

  query = addUserFilter(query, params.authorId, params.meId);
  const data = await processQuery<ILikedPost[]>(query);
  const isMe = isCurrentUserAuthor(params.authorId, params.meId);
  return filterPrivateLikedPosts(data, isMe);
};

// 특정 게시물 상세 정보 가져오기
export const getPost = async (
  params: IGetPost,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<IPostDetail | null> => {
  if (!params.postId) return null;

  let query = supabase
    .from("post")
    .select<string, IPostDetail>(
      POST_SUPABASE_QUERY.GET_POST_DETAIL_WITH_AUTHOR_INFO_AND_COMMENTS,
    )
    .eq("id", params.postId)
    .single();

  query = addUserFilter(query, undefined, params.meId);
  return processQuery(query);
};

// 특정 날짜의 유저 게시물 가져오기
export const getUserPostsThatDay = async (
  params: IGetUserPostsThatDay,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  let query = supabase
    .from("post")
    .select<string, IPost>(POST_SUPABASE_QUERY.GET_POSTS_WITH_AUTHOR_INFO)
    .gte("created_at", params.startOfDay)
    .lte("created_at", params.endOfDay)
    .eq("like.user_id", params.authorId)
    .order("created_at", { ascending: false });

  query = addUserFilter(query, params.authorId, params.meId);
  const data = await processQuery<IPost[]>(query);
  const isMe = isCurrentUserAuthor(params.authorId, params.meId);
  return filterPrivatePosts(data, isMe);
};

// 유저의 모든 게시물 가져오기
export const getUserPosts = async (
  params: IGetAllUserPosts,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  let query = supabase
    .from("post")
    .select<string, IPost>(POST_SUPABASE_QUERY.GET_POSTS_WITH_AUTHOR_INFO)
    .eq("post_type", params.postType)
    .order("created_at", { ascending: false })
    .range(params.pageParam, params.pageParam + params.limit - 1);

  query = addUserFilter(query, params.authorId, params.meId);
  const data = await processQuery<IPost[]>(query);
  const isMe = isCurrentUserAuthor(params.authorId, params.meId);
  return filterPrivatePosts(data, isMe);
};

// 게시물 생성
export const createPost = async (
  params: ICreatePost,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase
    .from("post")
    .insert({
      ...params,
      emotion_level: params.emotionLevel,
      access_type: params.accessType,
      post_type: params.postType,
    })
    .select();
  handleError(error);
};

// 게시물 삭제
export const deletePost = async (
  postId: number,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase.from("post").delete().eq("id", postId);
  handleError(error);
};

// 게시물 수정
export const updatePost = async (
  params: IUpdatePost,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase
    .from("post")
    .update({
      ...params,
      emotion_level: params.emotionLevel,
      access_type: params.accessType,
      post_type: params.postType,
    })
    .eq("id", params.id);
  handleError(error);
};

// 주어진 사용자에 대한 감정 평균치 가져오기
export const getEmotionAverage = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { data, error } = await supabase
    .from("post")
    .select("emotion_level")
    .neq("emotion_level", null)
    .eq("user_id", userId);

  handleError(error);

  if (!data || data.length === 0) {
    return 0;
  }

  const emotionLevels = data.map((item) =>
    parseEmotionLevel(item.emotion_level),
  );
  return calculateAverage(emotionLevels);
};
