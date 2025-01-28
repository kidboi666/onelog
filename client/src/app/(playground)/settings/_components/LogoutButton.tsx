'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import useSignOut from '@/src/services/mutates/auth/use-sign-out'
import { meQuery } from '@/src/services/queries/auth/me-query'
import Button from '@/src/components/Button'
import { YStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'

export default function LogoutButton() {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
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
