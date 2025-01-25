import { MouseEvent } from 'react'
import { TFollower } from '@/src/types/follow'
import Avatar from '@/src/components/Avatar'
import Button from '@/src/components/Button'
import { XStack, YStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'

interface Props {
  follower: TFollower
  onFollow: (e: MouseEvent) => void
  isFollowing: boolean
  isMe: boolean
  pushUserPage: () => void
  isPending: boolean
}

export default function FollowUserCard({
  follower,
  onFollow,
  isFollowing,
  isMe,
  pushUserPage,
  isPending,
}: Props) {
  if (isMe)
    return (
      <div
        onClick={pushUserPage}
        className="w-full cursor-pointer rounded-md p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
      >
        <XStack gap={4} key={follower.id} className="items-center">
          <Avatar
            size="base"
            src={follower.user_info.avatar_url}
            className="size-8"
          />
          <YStack gap={0} className="flex-1 justify-center">
            <TextDisplay>{follower.user_info.user_name}</TextDisplay>
            <TextDisplay type="caption" size="sm">
              @{follower.user_info.email.split('@')[0]}
            </TextDisplay>
          </YStack>
        </XStack>
      </div>
    )

  return (
    <div
      onClick={pushUserPage}
      className="w-full cursor-pointer rounded-md p-2 hover:bg-zinc-200 dark:hover:bg-zinc-700"
    >
      <XStack gap={4} key={follower.id} className="items-center">
        <Avatar
          size="base"
          src={follower.user_info.avatar_url}
          className="size-8"
        />
        <YStack gap={0} className="flex-1 justify-center">
          <TextDisplay>{follower.user_info.user_name}</TextDisplay>
          <TextDisplay type="caption" size="sm">
            @{follower.user_info.email.split('@')[0]}
          </TextDisplay>
        </YStack>
        {isFollowing ? (
          <Button
            variant="secondary"
            size="sm"
            isLoading={isPending}
            onClick={onFollow}
          >
            팔로우 취소
          </Button>
        ) : (
          <Button
            className="h-fit"
            size="sm"
            isLoading={isPending}
            onClick={onFollow}
          >
            팔로우 하기
          </Button>
        )}
      </XStack>
    </div>
  )
}
