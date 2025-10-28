'use client'

import { useRouter } from 'next/navigation'
import { useTransition } from 'react'
import { useMe } from '@/src/store/hooks/useMe'
import useResetPassword from '@/src/services/mutates/auth/use-reset-password'
import Button from '@/src/components/Button'
import Modal from '@/src/components/Modal'
import Title from '@/src/components/Title'

export default function ResetPasswordConfirmModal() {
  const router = useRouter()
  const { me } = useMe()
  const { mutate: resetPassword } = useResetPassword()
  const [isLoading, startTransition] = useTransition()

  const handleResetPassword = () => {
    if (!me) return null

    startTransition(() => resetPassword(me.email))
  }

  return (
    <Modal>
      <Title>정말 비밀번호를 변경 하시겠습니까?</Title>
      <div className="flex gap-2">
        <Button
          onClick={handleResetPassword}
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
