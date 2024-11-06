'use client'

import Avatar from '@/components/shared/Avatar'
import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import { XStack, YStack } from '@/components/shared/Stack'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import { followQuery } from '@/services/queries/follow/followQuery'
import { useSuspenseQuery } from '@tanstack/react-query'

interface Props {
  params: { userId: string }
}

export default function FollowerListModal({ params }: Props) {
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, params.userId),
  )
  const isFollowing = null
  return (
    <Modal className="sm:max-w-[600px]">
      <YStack gap={8} className="w-full">
        {followers?.map((follower) => (
          <>
            <XStack gap={4} key={follower.id} className="h-20 items-center">
              <Avatar size="base" src={follower.user_info.avatar_url} />
              <YStack gap={0} className="flex-1 justify-center">
                <Title size="sm">{follower.user_info.user_name}</Title>
                <Text type="caption">{follower.user_info.email}</Text>
              </YStack>
              {isFollowing ? (
                <Button size="sm" className="h-fit">
                  팔로우 하기
                </Button>
              ) : (
                <Button size="sm" className="h-fit">
                  팔로우 취소
                </Button>
              )}
            </XStack>
          </>
        ))}
      </YStack>
    </Modal>
  )
}
