'use client'

import useSignOut from '@/src/services/mutates/auth/useSignOut'

import useMeQueries from '@/src/hooks/queries/useMeQueries'

import Button from '@/src/components/Button'
import { YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'

export default function LogoutButton() {
  const { session } = useMeQueries()
  const { mutate: signOut } = useSignOut()

  const handleSingOut = () => {
    signOut()
  }

  return (
    <YStack>
      <Title>로그아웃</Title>
      <Button
        size="sm"
        onClick={handleSingOut}
        disabled={!session}
        className="w-fit"
      >
        로그아웃 하기
      </Button>
    </YStack>
  )
}
