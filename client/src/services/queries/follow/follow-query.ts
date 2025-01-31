import { followAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY } from '@/src/constants/index'
import { queryOptions } from '@tanstack/react-query'
import { IFollower } from '@/src/types/entities/follower'

export const followQuery = {
  /** 유저를 팔로우하는 유저의 Id들 */
  getFollower: (userId: string) =>
    queryOptions<IFollower[]>({
      queryKey: QUERY_KEY.FOLLOW.FOLLOWER(userId),
      queryFn: () => followAdapter.getFollowers(userId),
      enabled: !!userId,
    }),

  /** 유저가 팔로우하는 유저의 Id들 */
  getFollowing: (userId: string) =>
    queryOptions<IFollower[]>({
      queryKey: QUERY_KEY.FOLLOW.FOLLOWING(userId),
      queryFn: () => followAdapter.getFollowings(userId),
      enabled: !!userId,
    }),
}
