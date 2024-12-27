'use client'

import Follow from '@/src/components/Follow'
import useMe from '@/src/hooks/useMe'
import useFollowQueries from '@/src/hooks/query/useFollowQueries'
import useFollowActions from '@/src/hooks/actions/useFollowActions'

interface Props {
  userId: string
}

export default function RenderFollowButtonFromProfile({ userId }: Props) {
  const { me } = useMe()
  const { followingCount, followerCount, isFollowing } = useFollowQueries({
    meId: me.id,
    userId,
  })
  const { pushFollowingList, pushFollowerList } = useFollowActions({
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
