'use client'

import useFollowMutates from '@/src/hooks/mutates/useFollowMutates'
import useFollowQueries from '@/src/hooks/queries/useFollowQueries'

import Follow from '@/src/components/Follow'

interface Props {
  userId: string
}

export default function RenderFollowButtonFromProfile({ userId }: Props) {
  const { followingCount, followerCount, isFollowing } =
    useFollowQueries(userId)
  const {
    pushFollowingList,
    isLoadingFollowingRoute,
    pushFollowerList,
    isLoadingFollowerRoute,
  } = useFollowMutates({
    isFollowing,
    userId,
  })

  return (
    <Follow>
      <Follow.Follower
        followerCount={followerCount}
        isLoading={isLoadingFollowerRoute}
        onClick={pushFollowerList}
      />
      <Follow.Following
        followingCount={followingCount}
        isLoading={isLoadingFollowingRoute}
        onClick={pushFollowingList}
      />
    </Follow>
  )
}
