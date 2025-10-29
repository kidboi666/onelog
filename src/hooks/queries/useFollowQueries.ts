"use client";

import { useQuery, useSuspenseQuery } from "@tanstack/react-query";
import { useMe } from "@/app/_store/use-me";
import { countFollowQueries, followQueries } from "@/entities/follow";

export default function useFollowQueries(userId: string) {
  const { me } = useMe();
  const { data: followerCount } = useSuspenseQuery(
    countFollowQueries.countFollower(userId),
  );
  const { data: followingCount } = useSuspenseQuery(
    countFollowQueries.countFollowing(userId),
  );
  const { data: followers } = useSuspenseQuery(
    followQueries.getFollower(userId),
  );
  const { data: followings } = useSuspenseQuery(
    followQueries.getFollowing(userId),
  );
  const { data: myFollows } = useQuery(
    followQueries.getFollowing(me?.id ?? ""),
  );

  let isFollowing = false;
  let isMe = false;

  if (me) {
    isFollowing = !!followers?.find((user) => user.followerUserId === me.id);
    isMe = me.id === userId;
  }

  return {
    followerCount,
    followingCount,
    followers,
    followings,
    myFollows,
    isFollowing,
    isMe,
  };
}
