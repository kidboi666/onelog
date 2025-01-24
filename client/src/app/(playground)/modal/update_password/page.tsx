'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { supabase } from '@/src/lib/supabase/client'
import useResetPassword from '@/src/services/mutates/auth/use-reset-password'
import { meQuery } from '@/src/services/queries/auth/me-query'
import Button from '@/src/components/Button'
import Modal from '@/src/components/Modal'
import Title from '@/src/components/Title'

export default function ResetPasswordConfirmModal() {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getSession(supabase))
  const { mutate: resetPassword } = useResetPassword()
  const [isLoading, startTransition] = useTransition()

  const handleResetPassword = () => {
    resetPassword(me!.email)
  }

  return (
    <Modal>
      <Title>정말 비밀번호를 변경 하시겠습니까?</Title>
      <div className="flex gap-2">
        <Button
          onClick={() => startTransition(() => handleResetPassword())}
          isLoading={isLoading}
          variant="secondary"
        >
          변경이메일 보내기
        </Button>
        <Button onClick={() => router.back()}>취소하기</Button>
      </div>
    </Modal>
  )
}
