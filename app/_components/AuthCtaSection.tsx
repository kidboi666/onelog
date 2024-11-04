'use client'

import LinkButton from '@/components/shared/LinkButton'
import { XStack, YStack } from '@/components/shared/Stack'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function AuthCtaSection() {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  useEffect(() => {
    if (me) {
      router.replace('/home')
    }
  }, [me])

  return (
    <XStack className="w-full justify-center">
      <YStack gap={12} className="w-96 p-4">
        <YStack gap={4}>
          <Title>지금 가입하세요.</Title>
          <Title>오늘 당신의 감정을 기록하세요.</Title>
        </YStack>
        <YStack gap={4}>
          <LinkButton href="/home">구경하러 가기</LinkButton>
          <Title size="sm">함께하세요.</Title>
          <LinkButton href="/signup" variant="secondary">
            가입하러 가기
          </LinkButton>
        </YStack>
      </YStack>
    </XStack>
  )
}
