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
import Container from '@/components/shared/Container'
import { emotionQuery } from '@/services/queries/emotion/emotionQuery'
import { colorTheme, useTheme } from '@/store/useTheme'
import cn from '@/lib/cn'

interface Props {
  userId: string
}

export default function AboutMe({ userId }: Props) {
  const router = useRouter()
  const { color } = useTheme()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const isMyProfilePage = me?.userId === user?.id
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollowers(supabase, userId),
  )
  const { data: following } = useSuspenseQuery(
    followQuery.getFollwing(supabase, userId),
  )
  const isFollowing = isMyProfilePage
    ? null
    : followers?.find((user) => user.follower_user_id === me?.userId)
  const { data: myAverageEmotion } = useSuspenseQuery(
    emotionQuery.getEmotionAverage(supabase, userId),
  )
  const { mutate: followUser } = useFollow()
  const { mutate: unfollowUser } = useUnFollow()
  const [isLoadingProfile, startTransitionProfile] = useTransition()
  const [isLoadingWrite, startTransitionWrite] = useTransition()

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
    <Container
      isBackground
      className="items-center justify-center gap-4 p-8 max-lg:py-4"
    >
      <div className="relative">
        <Avatar src={user?.avatar_url} size="md" ring="xs" shadow="sm" />
        <Text
          size="xs"
          className={cn(
            colorTheme({ color }),
            'absolute -right-2 top-0 rounded-lg p-1 text-white shadow-md dark:text-white',
          )}
        >
          {myAverageEmotion}%
        </Text>
      </div>
      <div className="flex w-full flex-col items-center gap-4">
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-end">
          <Title>{user?.user_name}</Title>
          <Text as="span" type="caption" size="sm">
            {user?.email}
          </Text>
        </div>
        <Line className="w-full" />
        <div className="relative flex flex-col gap-4">
          <Text>
            {user?.about_me ? user.about_me : '자기 소개를 작성해주세요.'}
          </Text>
        </div>
        <div className="flex gap-2">
          <Text type="caption" size="sm">
            팔로우 {followers && followers.length >= 1 ? followers.length : 0}명
          </Text>
          <Text type="caption" size="sm">
            팔로잉 {following && following.length >= 1 ? following.length : 0}명
          </Text>
        </div>
        <div className="flex gap-4">
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
                  startTransitionWrite(() => router.push('/write/sentence'))
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
        </div>
      </div>
    </Container>
  )
}
