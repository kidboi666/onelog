'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { formatDateToHM, formatDateToMDY } from '@/src/utils/client-utils'
import { XStack, YStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'
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
    postQuery.getPost(supabase, postId, session?.id),
  )

  if (!post) {
    return null
  }

  const {
    userId,
    userInfo: { userName, avatarUrl, email },
    createdAt,
    emotionLevel,
  } = post

  return (
    <XStack gap={4} className="items-center">
      <AvatarButtonWithDropDown
        userId={userId}
        userName={userName}
        avatarUrl={avatarUrl}
        position="bottomRight"
      />
      <YStack gap={0} className="self-end">
        <XStack gap={1} className="items-end">
          <Title size="xs" type="sub">
            {userName}
          </Title>
          <TextDisplay as="span" type="caption" size="sm">
            · @{email?.split('@')[0]}
          </TextDisplay>
        </XStack>
        <TextDisplay type="caption" size="sm">
          {formatDateToMDY(createdAt)} · {formatDateToHM(createdAt)}
        </TextDisplay>
      </YStack>
      <XStack className="h-full flex-1 items-end justify-end p-2">
        <EmotionGauge
          emotionLevel={emotionLevel as TEmotion}
          className="h-full"
        />
      </XStack>
    </XStack>
  )
}
