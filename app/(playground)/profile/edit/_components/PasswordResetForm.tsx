'use client'

import { useRouter } from 'next/navigation'
import { useMe } from '@/src/store/hooks/useMe'
import { ROUTES } from '@/src/routes'
import Button from '@/src/components/Button'
import { YStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'
import Title from '@/src/components/Title'

export default function PasswordResetForm() {
  const router = useRouter()
  const { me } = useMe()
  const handlePasswordReset = () => {
    router.push(ROUTES.MODAL.UPDATE_PASSWORD)
  }

  return (
    <YStack>
      {me ? (
        <>
          <Title>비밀번호 변경</Title>
          <TextDisplay>
            이메일 :{' '}
            <TextDisplay as="span" className="text-gray-400">
              {me?.email}
            </TextDisplay>
          </TextDisplay>
          <Button onClick={handlePasswordReset} size="sm" className="w-fit">
            현재 이메일로 비밀번호 변경 이메일 보내기
          </Button>
        </>
      ) : (
        <>
          <Title>비밀번호 변경</Title>
          <Button disabled size="sm" className="w-fit">
            현재 이메일로 비밀번호 변경 이메일 보내기
          </Button>
        </>
      )}
    </YStack>
  )
}
