import { PropsWithChildren } from 'react'
import Button from './Button'
import { XStack } from './Stack'

const Follow = ({ children }: PropsWithChildren) => {
  return <XStack>{children}</XStack>
}

interface FollowerProps {
  followerCount: number | null
  isLoading: boolean
  onClick: () => void
}

const Follower = ({ followerCount, isLoading, onClick }: FollowerProps) => {
  return (
    <Button
      variant="none"
      size="none"
      className="text-xs font-normal text-zinc-400 hover:opacity-65 dark:text-zinc-500"
      isLoading={isLoading}
      onClick={onClick}
    >
      팔로워 {followerCount}명
    </Button>
  )
}

interface FollowingProps {
  followingCount: number | null
  isLoading: boolean
  onClick: () => void
}

const Following = ({ followingCount, isLoading, onClick }: FollowingProps) => {
  return (
    <Button
      variant="none"
      size="none"
      className="text-xs font-normal text-zinc-400 hover:opacity-65 dark:text-zinc-500"
      isLoading={isLoading}
      onClick={onClick}
    >
      팔로잉 {followingCount}명
    </Button>
  )
}

Follow.Follower = Follower
Follow.Following = Following

export default Follow
