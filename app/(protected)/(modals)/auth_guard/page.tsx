'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'

export default function AuthGuard() {
  const router = useRouter()

  const handleEnterPush = () => {
    router.push('/signin')
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEnterPush)

    return () => {
      document.removeEventListener('keydown', handleEnterPush)
    }
  }, [])

  return (
    <Modal>
      <Title>로그인이 필요합니다.</Title>

      <Button onClick={handleEnterPush}>로그인 하러가기</Button>
      <Button variant="secondary" onClick={() => router.back()}>
        취소
      </Button>
    </Modal>
  )
}
