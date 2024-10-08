'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { userQuery } from '@/services/queries/auth/userQuery'
import { meQuery } from '@/services/queries/auth/meQuery'
import Avatar from '@/components/feature/user/Avatar'
import Button from '@/components/shared/Button'
import Line from '@/components/shared/Line'
import Spinner from '@/components/shared/Spinner'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import Container from '../../_components/Container'

interface Props {
  userId: string
}

export default function AboutMe({ userId }: Props) {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  const isMyProfilePage = me?.userId === user?.id
  const [isLoadingProfile, startTransitionProfile] = useTransition()
  const [isLoadingWrite, startTransitionWrite] = useTransition()
  const [isLoadingFollowing, startTransitionFollowing] = useTransition()
  const [isLoadingSendMessage, startTransitionSendMessage] = useTransition()

  const handleFollowButtonClick = () => {
    return
  }

  const handleSendMessageButtonClick = () => {
    return
  }

  return (
    <Container
      isBackground
      className="items-center justify-center gap-4 p-8 max-lg:py-4"
    >
      <Avatar src={user?.avatar_url} size="md" ring="xs" shadow="sm" />
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
            팔로우 20명
          </Text>
          <Text type="caption" size="sm">
            팔로잉 8명
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
                  startTransitionWrite(() => router.push('/post/sentence'))
                }
              >
                {isLoadingWrite ? <Spinner size={16} /> : '한줄 쓰기'}
              </Button>
            </>
          ) : (
            <>
              <Button
                size="sm"
                onClick={() =>
                  startTransitionFollowing(() => handleFollowButtonClick())
                }
              >
                {isLoadingFollowing ? <Spinner size={16} /> : '팔로우 하기'}
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() =>
                  startTransitionSendMessage(() =>
                    handleSendMessageButtonClick(),
                  )
                }
              >
                {isLoadingSendMessage ? <Spinner size={16} /> : '메시지 보내기'}
              </Button>
            </>
          )}
        </div>
      </div>
    </Container>
  )
}
