'use client'

import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import Avatar from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import { colorTheme, ringTheme, useTheme } from '@/store/useTheme'
import cn from '@/lib/cn'
import { XStack } from '@/components/shared/Stack'
import { Container } from '@/components/shared/Container'

export default function PostSentenceContainer() {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { color } = useTheme()

  const handleSentenceClick = () => {
    me ? router.push('/write/sentence') : router.push('/auth_guard')
  }

  return (
    <Container onClick={handleSentenceClick}>
      <XStack gap={4}>
        <Avatar
          src={me?.avatar_url}
          size="sm"
          shadow="sm"
          className="max-sm:hidden"
        />
        <XStack
          className={cn(
            colorTheme({ color }),
            'w-full min-w-0 animate-cta-fadein-out items-center rounded-md bg-white p-2 text-sm dark:bg-var-darkgray',
            ringTheme({ color }),
          )}
        >
          <Text type="caption">오늘 당신의 생각을 한 줄로 기록하세요.</Text>
        </XStack>
      </XStack>
    </Container>
  )
}
