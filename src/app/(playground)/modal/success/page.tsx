'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Title from '@/src/components/Title'
import Button from '@/src/components/Button'
import Modal from '@/src/components/Modal'

export default function SuccessModal() {
  const router = useRouter()
  const handleEnterPush = (e?: KeyboardEvent) => {
    if (e?.key === 'Enter') {
      router.back()
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEnterPush)

    return () => {
      document.removeEventListener('keydown', handleEnterPush)
    }
  }, [])

  return (
    <Modal>
      <Title>요청이 완료되었습니다.</Title>
      <Button onClick={() => router.back()}>확인</Button>
    </Modal>
  )
}
