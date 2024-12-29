'use client'

import { routes } from '@/src/routes'

import useFollowMutates from '@/src/hooks/mutates/useFollowMutates'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import useDataDrivenAnimation from '@/src/hooks/useStateChange'

import Avatar from '@/src/components/Avatar'
import { DropDown } from '@/src/components/DropDow'
import Follow from '@/src/components/Follow'
import { XStack, YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'

interface Props {
  avatarUrl: string | null
  isMe: boolean
  isFollowing: boolean
  followerCount: number | null
  followingCount: number | null
  userId: string
  userName: string | null
}

export default function AvatarButtonWithDropDown({
  avatarUrl,
  isMe,
  isFollowing,
  followerCount,
  followingCount,
  userId,
  userName,
}: Props) {
  const { close, open, ref, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  const {
    onFollow,
    isPending,
    pushFollowerList,
    isLoadingFollowerRoute,
    pushFollowingList,
    isLoadingFollowingRoute,
  } = useFollowMutates({
    isFollowing,
    userId,
  })

  return (
    <DropDown.Root>
      <DropDown.Trigger
        targetRef={buttonRef}
        variant="none"
        onClick={onClick}
        className="p-0"
      >
        <Avatar src={avatarUrl} size="sm" shadow="sm" />
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        position="bottomRight"
        onTransitionEnd={onTransitionEnd}
        onClick={open}
        className="right-0 top-0"
      >
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
                isLoading={isLoadingFollowerRoute}
                onClick={pushFollowerList}
              />
              <Follow.Following
                followingCount={followingCount}
                isLoading={isLoadingFollowingRoute}
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
                    isLoading={isPending}
                    onClick={onFollow}
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
      </DropDown.Content>
    </DropDown.Root>
  )
}
