import { useSuspenseQuery } from '@tanstack/react-query'
import { followQuery } from '@/src/services/queries/follow/follow-query'

export default function useFollowValidate(
  userId: string,
  meId?: string | null,
) {
  const { data: followers } = useSuspenseQuery(followQuery.getFollower(userId))
  const isFollowing = meId
    ? !!followers?.find((user) => user.followerUserId === meId)
    : false

  return { isFollowing }
}
