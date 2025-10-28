'use client'

import { useMe } from '@/src/store/hooks/useMe'
import useSignOut from '@/src/services/mutates/auth/use-sign-out'
import Button from '@/src/components/Button'
import { YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'

export default function LogoutButton() {
  const { me } = useMe()
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
        disabled={!me}
        className="w-fit"
      >
        로그아웃 하기
      </Button>
    </YStack>
  )
}
