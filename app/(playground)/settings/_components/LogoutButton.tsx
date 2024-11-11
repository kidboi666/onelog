'use client'

import Button from '@/components/shared/Button'
import { YStack } from '@/components/shared/Stack'
import Title from '@/components/shared/Title'
import useMe from '@/hooks/useMe'
import useSignOut from '@/services/mutates/auth/useSignOut'

export default function LogoutButton() {
  const { session } = useMe()
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
