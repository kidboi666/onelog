import { handleError } from '@/src/adapters/query-helpers'
import { SUPABASE_QUERY } from '@/src/constants/index'
import { SupabaseClient } from '@supabase/supabase-js'
import { ICreateFollow, IDeleteFollow } from '@/src/types/dtos/follower'
import { IFollowBaseAdapter } from '@/src/types/services/index'

export const createSupabaseFollowAdapter = (
  supabase: SupabaseClient,
): IFollowBaseAdapter => {
  const getFollowers = async (userId: string) => {
    const { data, error } = await supabase
      .from('follow')
      .select(SUPABASE_QUERY.FOLLOW.GET_FOLLOWERS)
      .eq('followed_user_id', userId)
      .order('created_at', { ascending: false })

    handleError(error)
    return data
  }

  const getFollowings = async (userId: string) => {
    const { data, error } = await supabase
      .from('follow')
      .select(SUPABASE_QUERY.FOLLOW.GET_FOLLOWINGS)
      .eq('follower_user_id', userId)
      .order('created_at', { ascending: false })

    handleError(error)
    return data
  }

  const getFollowersCount = async (userId: string) => {
    const { query, options } = SUPABASE_QUERY.FOLLOW.GET_FOLLOWERS_COUNT
    const { count, error } = await supabase
      .from('follow')
      .select(query, options)
      .eq('followed_user_id', userId)

    handleError(error)
    return count
  }

  const getFollowingsCount = async (userId: string) => {
    const { query, options } = SUPABASE_QUERY.FOLLOW.GET_FOLLOWINGS_COUNT
    const { count, error } = await supabase
      .from('follow')
      .select(query, options)
      .eq('follower_user_id', userId)

    handleError(error)
    return count
  }

  const createFollow = async (params: ICreateFollow) => {
    const { data, error } = await supabase
      .from('follow')
      .insert({
        followed_user_id: params.followedUserId,
        follower_user_id: params.followerUserId,
      })
      .select()

    handleError(error)
    return data
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
