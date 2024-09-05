'use client'

import { useRouter } from 'next/navigation'
import useResetPassword from '@/services/mutates/auth/useResetPassword'
import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'
import Title from '@/components/shared/Title'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/meQuery'
import { supabase } from '@/lib/supabase/client'

export default function ResetPasswordConfirmModal() {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: resetPassword } = useResetPassword()

  const handleResetPassword = () => {
    resetPassword(me.email)
  }

  return (
    <Modal>
      <Title>정말 비밀번호를 변경 하시겠습니까?</Title>
      <div className="flex gap-2">
        <Button onClick={handleResetPassword} variant="secondary">
          변경이메일 보내기
        </Button>
        <Button onClick={() => router.back()}>취소하기</Button>
      </div>
    </Modal>
  )
}
