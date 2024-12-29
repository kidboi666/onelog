'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { supabase } from '@/src/lib/supabase/client'

import { meQuery } from '@/src/services/queries/auth/me-query'
import { postQuery } from '@/src/services/queries/post/post-query'

import { formatDateToHM, formatDateToMDY } from '@/src/utils/formatDate'

import { XStack, YStack } from '@/src/components/Stack'
import Text from '@/src/components/Text'
import Title from '@/src/components/Title'

import AvatarButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AvatarButtonWithDropDown'
import EmotionGauge from '@/src/app/(playground)/(home)/_components/EmotionGauge'
import { TEmotion } from '@/src/app/(playground)/post/edit/page'

interface Props {
  postId: number
}

export default function PostHeader({ postId }: Props) {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: post } = useSuspenseQuery(
    postQuery.getPost(supabase, postId, session?.userId),
  )

  const {
    user_id,
    user_info: { user_name, avatar_url, email },
    created_at,
    emotion_level,
  } = post

  return (
    <XStack gap={4} className="items-center">
      <AvatarButtonWithDropDown
        userId={user_id}
        userName={user_name}
        avatarUrl={avatar_url}
        position="bottomRight"
      />
      <YStack gap={0} className="self-end">
        <XStack gap={1} className="items-end">
          <Title size="xs" type="sub">
            {user_name}
          </Title>
          <Text as="span" type="caption" size="sm">
            · @{email?.split('@')[0]}
          </Text>
        </XStack>
        <Text type="caption" size="sm">
          {formatDateToMDY(created_at)} · {formatDateToHM(created_at)}
        </Text>
      </YStack>
      <XStack className="h-full flex-1 items-end justify-end p-2">
        <EmotionGauge
          emotionLevel={emotion_level as TEmotion}
          className="h-full"
        />
      </XStack>
    </XStack>
  )
}
