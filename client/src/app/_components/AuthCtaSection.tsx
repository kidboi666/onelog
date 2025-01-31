'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useMe } from '@/src/store/hooks/useMe'
import { ROUTES } from '@/src/routes'
import LinkButton from '@/src/components/LinkButton'
import { XStack, YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'

export default function AuthCtaSection() {
  const router = useRouter()
  const { me } = useMe()

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
          <LinkButton href={ROUTES.HOME}>구경하러 가기</LinkButton>
          <Title size="sm">함께하세요.</Title>
          <LinkButton href={ROUTES.MODAL.AUTH.SIGN_UP} variant="secondary">
            가입하러 가기
          </LinkButton>
        </YStack>
      </YStack>
    </XStack>
  )
}
