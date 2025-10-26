import {
  getFollowersCount,
  getFollowingsCount,
} from '@/src/services/supabase/follow'
import { QUERY_KEY } from '@/src/constants/index'
import { queryOptions } from '@tanstack/react-query'

export const countFollowQuery = {
  /** 유저를 팔로우하는 유저의 Id들 */
  countFollower: (userId: string, isMount: boolean | undefined = false) =>
    queryOptions({
      queryKey: QUERY_KEY.FOLLOW.COUNT.FOLLOWER(userId),
      queryFn: () => getFollowersCount(userId),
      enabled: isMount,
    }),

  /** 유저가 팔로우하는 유저의 Id들 */
  countFollowing: (userId: string, isMount: boolean | undefined = false) =>
    queryOptions({
      queryKey: QUERY_KEY.FOLLOW.COUNT.FOLLOWING(userId),
      queryFn: () => getFollowingsCount(userId),
      enabled: isMount,
    }),
}
