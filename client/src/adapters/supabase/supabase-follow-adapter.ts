import {
  handleError,
  processCountQuery,
  processQuery,
} from '@/src/adapters/query-helpers'
import { SUPABASE_QUERY } from '@/src/constants/index'
import { SupabaseClient } from '@supabase/supabase-js'
import { ICreateFollow, IDeleteFollow } from '@/src/types/dtos/follower'
import { IFollowBaseAdapter } from '@/src/types/services/index'

export const createSupabaseFollowAdapter = (
  supabase: SupabaseClient,
): IFollowBaseAdapter => {
  const getFollowers = async (userId: string) => {
    const query = supabase
      .from('follow')
      .select(SUPABASE_QUERY.FOLLOW.GET_FOLLOWERS)
      .eq('followed_user_id', userId)
      .order('created_at', { ascending: false })
    return processQuery(query)
  }

  const getFollowings = async (userId: string) => {
    const query = supabase
      .from('follow')
      .select(SUPABASE_QUERY.FOLLOW.GET_FOLLOWINGS)
      .eq('follower_user_id', userId)
      .order('created_at', { ascending: false })
    return processQuery(query)
  }

  const getFollowersCount = async (userId: string) => {
    const { query: queryString, options } =
      SUPABASE_QUERY.FOLLOW.GET_FOLLOWERS_COUNT
    const query = supabase
      .from('follow')
      .select(queryString, options)
      .eq('followed_user_id', userId)
    return processCountQuery(query)
  }

  const getFollowingsCount = async (userId: string) => {
    const { query: queryString, options } =
      SUPABASE_QUERY.FOLLOW.GET_FOLLOWINGS_COUNT
    const query = supabase
      .from('follow')
      .select(queryString, options)
      .eq('follower_user_id', userId)
    return processCountQuery(query)
  }

  const createFollow = async (params: ICreateFollow) => {
    const query = supabase
      .from('follow')
      .insert({
        followed_user_id: params.followedUserId,
        follower_user_id: params.followerUserId,
      })
      .select()
    return processQuery(query)
  }

  const deleteFollow = async (params: IDeleteFollow) => {
    const { error } = await supabase
      .from('follow')
      .delete()
      .eq('followed_user_id', params.followedUserId)
      .eq('follower_user_id', params.followerUserId)
    handleError(error)
  }

  return {
    getFollowers,
    getFollowings,
    getFollowersCount,
    getFollowingsCount,
    createFollow,
    deleteFollow,
  }
}
