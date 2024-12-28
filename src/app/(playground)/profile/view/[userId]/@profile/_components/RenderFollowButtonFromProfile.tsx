'use client'

import Follow from '@/src/components/Follow'
import useMeQueries from '@/src/hooks/queries/useMeQueries'
import useFollowQueries from '@/src/hooks/queries/useFollowQueries'
import useFollowMutates from '@/src/hooks/mutates/useFollowMutates'

interface Props {
  userId: string
}

export default function RenderFollowButtonFromProfile({ userId }: Props) {
  const { me } = useMeQueries()
  const { followingCount, followerCount, isFollowing } = useFollowQueries({
    meId: me.id,
    userId,
  })
  const { pushFollowingList, pushFollowerList } = useFollowMutates({
    isFollowing,
    me,
    userId,
  })
  return (
    <Follow>
      <Follow.Follower
        followerCount={followerCount}
        onClick={pushFollowerList}
      />
      <Follow.Following
        followingCount={followingCount}
        onClick={pushFollowingList}
      />
    </Follow>
  )
}
