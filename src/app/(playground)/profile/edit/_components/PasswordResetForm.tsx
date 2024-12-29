'use client'

import { routes } from '@/src/routes'
import { useRouter } from 'next/navigation'

import useMeQueries from '@/src/hooks/queries/useMeQueries'

import Button from '@/src/components/Button'
import { YStack } from '@/src/components/Stack'
import Text from '@/src/components/Text'
import Title from '@/src/components/Title'

export default function PasswordResetForm() {
  const router = useRouter()
  const { me, session } = useMeQueries()
  const handlePasswordReset = () => {
    router.push(routes.modal.updatePassword)
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
