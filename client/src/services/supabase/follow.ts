import {
  handleError,
  processCountQuery,
  processQuery,
} from '@/src/services/supabase/helpers'
import { SUPABASE_QUERY } from '@/src/constants/index'
import { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@/src/lib/supabase/create-browser-client'
import { ICreateFollow, IDeleteFollow } from '@/src/types/dtos/follower'

export const getFollowers = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<any> => {
  const query = supabase
    .from('follow')
    .select(SUPABASE_QUERY.FOLLOW.GET_FOLLOWERS)
    .eq('followed_user_id', userId)
    .order('created_at', { ascending: false })
  return processQuery(query)
}

export const getFollowings = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
): Promise<any> => {
  const query = supabase
    .from('follow')
    .select(SUPABASE_QUERY.FOLLOW.GET_FOLLOWINGS)
    .eq('follower_user_id', userId)
    .order('created_at', { ascending: false })
  return processQuery(query)
}

export const getFollowersCount = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { query: queryString, options } =
    SUPABASE_QUERY.FOLLOW.GET_FOLLOWERS_COUNT
  const query = supabase
    .from('follow')
    .select(queryString, options)
    .eq('followed_user_id', userId)
  return processCountQuery(query)
}

export const getFollowingsCount = async (
  userId: string,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { query: queryString, options } =
    SUPABASE_QUERY.FOLLOW.GET_FOLLOWINGS_COUNT
  const query = supabase
    .from('follow')
    .select(queryString, options)
    .eq('follower_user_id', userId)
  return processCountQuery(query)
}

export const createFollow = async (
  params: ICreateFollow,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const query = supabase
    .from('follow')
    .insert({
      followed_user_id: params.followedUserId,
      follower_user_id: params.followerUserId,
    })
    .select()
  return processQuery(query)
}

export const deleteFollow = async (
  params: IDeleteFollow,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase
    .from('follow')
    .delete()
    .eq('followed_user_id', params.followedUserId)
    .eq('follower_user_id', params.followerUserId)
  handleError(error)
}
