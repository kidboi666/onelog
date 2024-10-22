'use client'

import Button from '@/components/shared/Button'
import Title from '@/components/shared/Title'
import { supabase } from '@/lib/supabase/client'
import useSignOut from '@/services/mutates/auth/useSignOut'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useSuspenseQuery } from '@tanstack/react-query'

export default function LogoutButton() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: signOut } = useSignOut()

  const handleSingOut = () => {
    signOut()
  }

  return (
    <div className="flex flex-col gap-2">
      <Title>로그아웃</Title>
      <Button
        size="sm"
        onClick={handleSingOut}
        disabled={!me}
        className="w-fit"
      >
        로그아웃 하기
      </Button>
    </div>
  )
}
