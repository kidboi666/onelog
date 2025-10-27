import type { SupabaseClient } from "@supabase/supabase-js";
import type { ICreateFollow, IDeleteFollow } from "@/entities/follow/api/dtos";
import { FOLLOW_SUPABASE_QUERY } from "@/entities/follow/model/constants";
import { createBrowserClient } from "@/shared/lib/supabase/create-browser-client";
import {
  handleError,
  processCountQuery,
  processQuery,
} from "@/shared/lib/supabase/helpers";

export const getFollowers = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<any> => {
  const query = supabase
    .from("follow")
    .select(FOLLOW_SUPABASE_QUERY.GET_FOLLOWERS)
    .eq("followed_user_id", userId)
    .order("created_at", { ascending: false });
  return processQuery(query);
};

export const getFollowings = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<any> => {
  const query = supabase
    .from("follow")
    .select(FOLLOW_SUPABASE_QUERY.GET_FOLLOWINGS)
    .eq("follower_user_id", userId)
    .order("created_at", { ascending: false });
  return processQuery(query);
};

export const getFollowersCount = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { query: queryString, options } =
    FOLLOW_SUPABASE_QUERY.GET_FOLLOWERS_COUNT;
  const query = supabase
    .from("follow")
    .select(queryString, options)
    .eq("followed_user_id", userId);
  return processCountQuery(query);
};

export const getFollowingsCount = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { query: queryString, options } =
    FOLLOW_SUPABASE_QUERY.GET_FOLLOWINGS_COUNT;
  const query = supabase
    .from("follow")
    .select(queryString, options)
    .eq("follower_user_id", userId);
  return processCountQuery(query);
};

export const createFollow = async (
  params: ICreateFollow,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const query = supabase
    .from("follow")
    .insert({
      followed_user_id: params.followedUserId,
      follower_user_id: params.followerUserId,
    })
    .select();
  return processQuery(query);
};

export const deleteFollow = async (
  params: IDeleteFollow,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase
    .from("follow")
    .delete()
    .eq("followed_user_id", params.followedUserId)
    .eq("follower_user_id", params.followerUserId);
  handleError(error);
};
