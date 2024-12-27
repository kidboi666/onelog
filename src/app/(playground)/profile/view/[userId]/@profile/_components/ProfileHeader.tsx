'use client'

import { YStack, ZStack } from '@/src/components/Stack'
import Avatar from '@/src/components/Avatar'
import EmotionAverage from '@/src/app/(playground)/profile/view/[userId]/@profile/_components/EmotionAverage'
import Title from '@/src/components/Title'
import Text from '@/src/components/Text'
import { useSuspenseQuery } from '@tanstack/react-query'
import { userQuery } from '@/src/services/queries/auth/user-query'
import { supabase } from '@/src/lib/supabase/client'

interface Props {
  userId: string
}

export default function ProfileHeader({ userId }: Props) {
  const { data: user } = useSuspenseQuery(
    userQuery.getUserInfo(supabase, userId),
  )
  return (
    <>
      <ZStack className="relative">
        <Avatar src={user.avatar_url} size="md" ring shadow="sm" />
        <EmotionAverage userId={userId} />
      </ZStack>
      <YStack className="items-center sm:flex-row sm:items-end">
        <Title>{user.user_name}</Title>
        <Text as="span" type="caption" size="sm">
          {user.email}
        </Text>
      </YStack>
    </>
  )
}
