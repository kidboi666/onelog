import type { SupabaseClient } from "@supabase/supabase-js";
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
import type {
  ICreatePost,
  IGetAllPosts,
  IGetAllUserPosts,
  IGetLikedPosts,
  IGetPost,
  IGetUserPostsThatDay,
  IUpdatePost,
} from "./dtos";

export const postApi = {
  getAllPosts: async (
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
  },

  getLikedPosts: async (
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
    return processQuery<ILikedPost[]>(query);
  },

  getPost: async (
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
  },

  getUserPostsThatDay: async (
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
    return processQuery<IPost[]>(query);
  },

  getUserPosts: async (
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
    return processQuery<IPost[]>(query);
  },

  createPost: async (
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
  },

  deletePost: async (
    postId: number,
    supabase: SupabaseClient = createBrowserClient(),
  ) => {
    const { error } = await supabase.from("post").delete().eq("id", postId);
    handleError(error);
  },

  updatePost: async (
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
  },

  getEmotionLevels: async (
    userId: string,
    supabase: SupabaseClient = createBrowserClient(),
  ) => {
    const { data, error } = await supabase
      .from("post")
      .select("emotion_level")
      .neq("emotion_level", null)
      .eq("user_id", userId);
    handleError(error);
    return data || [];
  },

  countUserPost: async (
    userId: string,
    supabase: SupabaseClient = createBrowserClient(),
  ) => {
    const { count, error } = await supabase
      .from("post")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);
    handleError(error);
    return count ?? 0;
  },

  countLikedPost: async (
    userId: string,
    supabase: SupabaseClient = createBrowserClient(),
  ) => {
    const { count, error } = await supabase
      .from("like")
      .select("*", { count: "exact", head: true })
      .eq("user_id", userId);
    handleError(error);
    return count ?? 0;
  },
};
