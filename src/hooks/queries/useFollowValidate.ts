import { useSuspenseQuery } from "@tanstack/react-query";
import { followQueries } from "@/entities/follow";

export default function useFollowValidate(
  userId: string,
  meId?: string | null,
) {
  const { data: followers } = useSuspenseQuery(
    followQueries.getFollower(userId),
  );
  const isFollowing = meId
    ? !!followers?.find((user) => user.followerUserId === meId)
    : false;

  return { isFollowing };
}
