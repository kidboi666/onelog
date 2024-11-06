import Avatar from '@/components/shared/Avatar'
import Button from '@/components/shared/Button'
import { XStack, YStack } from '@/components/shared/Stack'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'

interface Props {
  follower: any
  follow: any
  unfollow: any
  isFollowing: boolean
  isMe: boolean
}
/**
 * TODO #7 추후 타입핑 요망 @kidboi666
 */

export default function FollowUserCard({
  follower,
  follow,
  unfollow,
  isFollowing,
  isMe,
}: Props) {
  if (isMe)
    return (
      <XStack gap={4} key={follower.id} className="h-20 items-center">
        <Avatar size="base" src={follower.user_info.avatar_url} />
        <YStack gap={0} className="flex-1 justify-center">
          <Title size="sm">{follower.user_info.user_name}</Title>
          <Text type="caption">{follower.user_info.email}</Text>
        </YStack>
      </XStack>
    )

  return (
    <XStack gap={4} key={follower.id} className="h-20 items-center">
      <Avatar size="base" src={follower.user_info.avatar_url} />
      <YStack gap={0} className="flex-1 justify-center">
        <Title size="sm">{follower.user_info.user_name}</Title>
        <Text type="caption">{follower.user_info.email}</Text>
      </YStack>
      {isFollowing ? (
        <Button
          variant="secondary"
          size="sm"
          onClick={() => unfollow(follower.user_info.id)}
        >
          팔로우 취소
        </Button>
      ) : (
        <Button
          size="sm"
          className="h-fit"
          onClick={() => follow(follower.user_info.id)}
        >
          팔로우 하기
        </Button>
      )}
    </XStack>
  )
}
