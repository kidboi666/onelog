'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import { userQuery } from '@/services/queries/auth/userQuery'
import { meQuery } from '@/services/queries/auth/meQuery'
import { followQuery } from '@/services/queries/follow/followQuery'

import Avatar from '@/components/shared/Avatar'
import Button from '@/components/shared/Button'
import Line from '@/components/shared/Line'
import Spinner from '@/components/shared/Spinner'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import useFollow from '@/services/mutates/follow/useFollow'
import useUnFollow from '@/services/mutates/follow/useUnFollow'
import EmotionAverage from './EmotionAverage'
import { XStack, YStack, ZStack } from '@/components/shared/Stack'
import { Container } from '@/components/shared/Container'
import { countFollowQuery } from '@/services/queries/follow/countFollowQuery'
import Follow from '@/components/shared/Follow'

interface Props {
  userId: string
}

export default function AboutMe({ userId }: Props) {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const { data: followingCount } = useSuspenseQuery(
    countFollowQuery.countFollowing(supabase, userId),
  )
  const { data: followerCount } = useSuspenseQuery(
    countFollowQuery.countFollower(supabase, userId),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, userId),
  )
  const { mutate: followUser } = useFollow()
  const { mutate: unfollowUser } = useUnFollow()
  const [isLoadingProfile, startTransitionProfile] = useTransition()
  const [isLoadingWrite, startTransitionWrite] = useTransition()
  const isMyProfilePage = me?.userId === user?.id
  const isFollowing =
    !isMyProfilePage &&
    followers?.find((user) => user.follower_user_id === me?.userId)

  const pushFollowerList = () => router.push(`/follower/${userId}`)
  const pushFollowingList = () => router.push(`/following/${userId}`)

  const handleFollowButtonClick = () => {
    me
      ? isFollowing
        ? unfollowUser({
            followed_user_id: userId,
            follower_user_id: me!.userId,
          })
        : followUser({ followed_user_id: userId, follower_user_id: me!.userId })
      : router.push('/auth_guard')
  }

  const handleSendMessageButtonClick = () => {
    return
  }

  return (
    <Container className="rounded-md bg-white p-8 shadow-sm transition max-lg:py-4 dark:bg-var-darkgray">
      <YStack gap={4} className="items-center justify-center">
        <ZStack className="relative">
          <Avatar src={user?.avatar_url} size="md" ring shadow="sm" />
          <EmotionAverage userId={userId} />
        </ZStack>
        <YStack gap={4} className="w-full items-center">
          <YStack className="items-center sm:flex-row sm:items-end">
            <Title>{user?.user_name}</Title>
            <Text as="span" type="caption" size="sm">
              {user?.email}
            </Text>
          </YStack>
          <Line className="w-full" />
          <ZStack direction="col" gap={4}>
            <Text>
              {user?.about_me ? user.about_me : '자기 소개를 작성해주세요.'}
            </Text>
          </ZStack>
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
            {isMyProfilePage ? (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() =>
                    startTransitionProfile(() => router.push('/edit_profile'))
                  }
                  className="text-nowrap"
                >
                  {isLoadingProfile ? <Spinner size={16} /> : '프로필 수정'}
                </Button>
                <Button
                  size="sm"
                  onClick={() =>
                    startTransitionWrite(() => router.push('/write'))
                  }
                >
                  {isLoadingWrite ? <Spinner size={16} /> : '글쓰기'}
                </Button>
              </>
            ) : (
              <>
                <Button size="sm" onClick={handleFollowButtonClick}>
                  {isFollowing ? '팔로우 취소' : '팔로우 하기'}
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={handleSendMessageButtonClick}
                >
                  메시지 보내기
                </Button>
              </>
            )}
          </XStack>
        </YStack>
      </YStack>
    </Container>
  )
}
