'use client'

import { useRouter } from 'next/navigation'
import cn from '@/src/lib/cn'
import { useMe } from '@/src/store/hooks/useMe'
import { useTheme } from '@/src/store/hooks/useTheme'
import { ROUTES } from '@/src/routes'
import Avatar from '@/src/components/Avatar'
import { XStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'

export default function FakeFormContainer() {
  const router = useRouter()
  const { me } = useMe()
  const { color } = useTheme()

  const pushNewPost = () => router.push(ROUTES.POST.NEW)
  const authGuard = () => router.push(ROUTES.MODAL.AUTH.GUARD)

  const handlePostClick = () => {
    me ? pushNewPost() : authGuard()
  }
  return (
    <div onClick={handlePostClick}>
      <XStack gap={4}>
        <Avatar
          src={me?.avatarUrl}
          size="sm"
          shadow="sm"
          className="max-sm:hidden"
        />
        <div
          className={cn(
            'w-full min-w-0 animate-cta-fadein-out items-center rounded-md bg-white p-2 text-sm dark:bg-var-darkgray',
            color === 'blue' && 'ring-var-blue/65',
            color === 'orange' && 'ring-var-orange/65',
            color === 'yellow' && 'ring-var-yellow/65',
            color === 'green' && 'ring-var-green/65',
            color === 'black' && 'ring-var-black/65',
          )}
        >
          {/**
           * 스타일 적용 문제 @kidboi666
           * ringTheme를 사용한 스타일링이 간헐적으로 적용되는 문제 발생
           * tailwind.config 에 있는 animate 와 충돌이 있는듯 보임
           */}
          <TextDisplay type="caption">
            오늘 당신의 생각을 한 줄로 기록하세요.
          </TextDisplay>
        </div>
      </XStack>
    </div>
  )
}
