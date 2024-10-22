'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Title from '@/components/shared/Title'
import Button from '@/components/shared/Button'
import Modal from '@/components/shared/Modal'

export default function AuthGuardModal() {
  const router = useRouter()

  const handleSignPagePush = () => {
    router.push('/signin')
  }

  const handleEnterPush = (e: KeyboardEvent) => {
    const ReactEvent = e as never as React.KeyboardEvent
    if (ReactEvent?.key === 'Enter') {
      handleSignPagePush()
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
      <Title>로그인이 필요합니다.</Title>
      <div className="flex w-full gap-2">
        <Button onClick={handleSignPagePush} className="w-full">
          로그인 하러가기
        </Button>
        <Button
          variant="secondary"
          onClick={() => router.back()}
          className="w-full"
        >
          취소
        </Button>
      </div>
    </Modal>
  )
}
