'use client'

import Button from '@/components/shared/Button'
import { YStack } from '@/components/shared/Stack'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import { ROUTES } from '@/constants/routes'
import useMe from '@/hooks/useMe'
import { useRouter } from 'next/navigation'

export default function PasswordResetForm() {
  const router = useRouter()
  const { me, session } = useMe()
  const handlePasswordReset = () => {
    router.push(ROUTES.MODAL.UPDATE_PASSWORD)
  }

  return (
    <YStack>
      {session ? (
        <>
          <Title>비밀번호 변경</Title>
          <Text>
            이메일 :{' '}
            <Text as="span" className="text-gray-400">
              {me?.email}
            </Text>
          </Text>
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
