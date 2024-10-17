'use client'

import Button from '@/components/shared/Button'
import Title from '@/components/shared/Title'
import useSignOut from '@/services/mutates/auth/useSignOut'

export default function LogoutButton() {
  const { mutate: signOut } = useSignOut()
  return (
    <div className="flex flex-col gap-2">
      <Title>로그아웃</Title>
      <Button size="sm" onClick={() => signOut()} className="w-fit">
        로그아웃 하기
      </Button>
    </div>
  )
}
