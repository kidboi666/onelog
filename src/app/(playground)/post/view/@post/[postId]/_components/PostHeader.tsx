'use client'

import { XStack, YStack } from '@/src/components/Stack'
import AvatarButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AvatarButtonWithDropDown'
import Title from '@/src/components/Title'
import Text from '@/src/components/Text'
import { formatDateToHM, formatDateToMDY } from '@/src/utils/formatDate'
import EmotionGauge from '@/src/app/(playground)/(home)/_components/EmotionGauge'
import { TEmotion } from '@/src/app/(playground)/post/edit/page'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'
import { meQuery } from '@/src/services/queries/auth/me-query'

interface Props {
  postId: number
}

export default function PostHeader({ postId }: Props) {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: post } = useSuspenseQuery(
    postQuery.getPost(supabase, postId, session?.userId),
  )

  return (
    <XStack gap={4} className="items-center">
      <AvatarButtonWithDropDown
        userId={post?.user_id}
        userName={post?.user_info.user_name}
        avatarUrl={post?.user_info.avatar_url}
        position="bottomRight"
      />
      <YStack gap={0} className="self-end">
        <XStack gap={1} className="items-end">
          <Title size="xs" type="sub">
            {post?.user_info.user_name}
          </Title>
          <Text as="span" type="caption" size="sm">
            · @{post?.user_info.email?.split('@')[0]}
          </Text>
        </XStack>
        <Text type="caption" size="sm">
          {formatDateToMDY(post?.created_at)} ·{' '}
          {formatDateToHM(post?.created_at)}
        </Text>
      </YStack>
      <XStack className="h-full flex-1 items-end justify-end p-2">
        <EmotionGauge
          emotionLevel={post?.emotion_level as TEmotion}
          className="h-full"
        />
      </XStack>
    </XStack>
  )
}
