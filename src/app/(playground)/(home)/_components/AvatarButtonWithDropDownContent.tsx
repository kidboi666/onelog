import { XStack, YStack } from '@/src/components/Stack'
import Avatar from '@/src/components/Avatar'
import Title from '@/src/components/Title'
import Follow from '@/src/components/Follow'
import { DropDown } from '@/src/components/DropDown'
import { routes } from '@/src/routes'
import { useTransition } from 'react'

interface Props {
  avatarUrl: string | null
  userName: string | null
  followerCount: number | null
  pushFollowerList: any | null
  followingCount: number | null
  pushFollowingList: any | null
  isMe: boolean
  isFollowing: boolean
  onFollowButtonClick: () => void
  userId: string
}

export default function AvatarButtonWithDropDownContent({
  pushFollowingList,
  followerCount,
  userId,
  userName,
  isMe,
  avatarUrl,
  pushFollowerList,
  followingCount,
  onFollowButtonClick,
  isFollowing,
}: Props) {
  const [isLoadingFollowing, startTransitionFollowing] = useTransition()

  return (
    <YStack gap={4} className="p-4">
      <YStack gap={4} className="items-center">
        <Avatar src={avatarUrl} size="sm" />
        <Title type="sub" size="sm">
          {userName}
        </Title>
      </YStack>
      <YStack gap={4} className="items-center">
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
        <XStack gap={4}>
          {isMe ? (
            <>
              <DropDown.LinkButton
                href={routes.profile.edit}
                variant="secondary"
              >
                프로필 수정
              </DropDown.LinkButton>
              <DropDown.LinkButton href={routes.profile.view(userId)}>
                마이 페이지
              </DropDown.LinkButton>
            </>
          ) : (
            <>
              <DropDown.Button
                variant="secondary"
                isLoading={isLoadingFollowing}
                onClick={() =>
                  startTransitionFollowing(() => onFollowButtonClick())
                }
              >
                {isFollowing ? '팔로우 취소' : '팔로우 하기'}
              </DropDown.Button>
              <DropDown.LinkButton href={routes.profile.view(userId)}>
                프로필 페이지
              </DropDown.LinkButton>
            </>
          )}
        </XStack>
      </YStack>
    </YStack>
  )
}
