import { queryOptions } from "@tanstack/react-query";
import * as followService from "@/entities/follow/lib/follow-service";
import { FOLLOW_QUERY_KEY } from "@/entities/follow/model/constants";
import type { IFollower } from "@/entities/follow/model/types";

export const followQuery = {
  /** 유저를 팔로우하는 유저의 Id들 */
  getFollower: (userId: string) =>
    queryOptions<IFollower[]>({
      queryKey: FOLLOW_QUERY_KEY.FOLLOWER(userId),
      queryFn: () => followService.getFollowers(userId),
      enabled: !!userId,
    }),

  /** 유저가 팔로우하는 유저의 Id들 */
  getFollowing: (userId: string) =>
    queryOptions<IFollower[]>({
      queryKey: FOLLOW_QUERY_KEY.FOLLOWING(userId),
      queryFn: () => followService.getFollowings(userId),
      enabled: !!userId,
    }),
};

export const countFollowQuery = {
  /** 유저를 팔로우하는 유저의 Id들 */
  countFollower: (userId: string, isMount: boolean | undefined = false) =>
    queryOptions({
      queryKey: FOLLOW_QUERY_KEY.COUNT.FOLLOWER(userId),
      queryFn: () => followService.getFollowersCount(userId),
      enabled: isMount,
    }),

  /** 유저가 팔로우하는 유저의 Id들 */
  countFollowing: (userId: string, isMount: boolean | undefined = false) =>
    queryOptions({
      queryKey: FOLLOW_QUERY_KEY.COUNT.FOLLOWING(userId),
      queryFn: () => followService.getFollowingsCount(userId),
      enabled: isMount,
    }),
};
