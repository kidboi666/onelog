import { QueryHelpers } from '@/src/adapters/query-helpers'
import { SUPABASE_QUERY } from '@/src/constants/index'
import { SupabaseClient } from '@supabase/supabase-js'
import {
  ICreateFollow,
  IDeleteFollow,
  IFollowBaseAdapter,
} from '@/src/types/follow'

export class SupabaseFollowAdapter
  extends QueryHelpers
  implements IFollowBaseAdapter
{
  constructor(private readonly supabase: SupabaseClient) {
    super()
  }

  async getFollowers(userId: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('follow')
      .select(SUPABASE_QUERY.FOLLOW.GET_FOLLOWERS)
      .eq('followed_user_id', userId)
      .order('created_at', { ascending: false })

    this.handleError(error)
    return data
  }

  async getFollowings(userId: string): Promise<any> {
    const { data, error } = await this.supabase
      .from('follow')
      .select(SUPABASE_QUERY.FOLLOW.GET_FOLLOWINGS)
      .eq('follower_user_id', userId)
      .order('created_at', { ascending: false })

    this.handleError(error)
    return data
  }

  async getFollowersCount(userId: string): Promise<any> {
    const { query, options } = SUPABASE_QUERY.FOLLOW.GET_FOLLOWERS_COUNT
    const { count, error } = await this.supabase
      .from('follow')
      .select(query, options)
      .eq('followed_user_id', userId)

    this.handleError(error)
    return count
  }

  async getFollowingsCount(userId: string): Promise<any> {
    const { query, options } = SUPABASE_QUERY.FOLLOW.GET_FOLLOWINGS_COUNT
    const { count, error } = await this.supabase
      .from('follow')
      .select(query, options)
      .eq('follower_user_id', userId)

    this.handleError(error)
    return count
  }

  async createFollow(params: ICreateFollow): Promise<any> {
    const { data, error } = await this.supabase
      .from('follow')
      .insert({
        followed_user_id: params.followedUserId,
        follower_user_id: params.followerUserId,
      })
      .select()

    this.handleError(error)
    return data
  }

  async deleteFollow(params: IDeleteFollow): Promise<any> {
    const { error } = await this.supabase
      .from('follow')
      .delete()
      .eq('followed_user_id', params.followedUserId)
      .eq('follower_user_id', params.followerUserId)

    this.handleError(error)
  }
}
