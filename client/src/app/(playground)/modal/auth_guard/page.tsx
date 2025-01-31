'use client'

import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'
import { ROUTES } from '@/src/routes'
import Button from '@/src/components/Button'
import Modal from '@/src/components/Modal'
import { XStack } from '@/src/components/Stack'
import Title from '@/src/components/Title'

export default function AuthGuardModal() {
  const router = useRouter()

  const pushSignIn = () => {
    router.replace(ROUTES.MODAL.AUTH.SIGN_IN)
  }

  const handleEnterPush = (e: KeyboardEvent) => {
    const ReactEvent = e as never as React.KeyboardEvent
    if (ReactEvent?.key === 'Enter') {
      pushSignIn()
    }
  }

  const pushBack = () => {
    router.back()
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
      <XStack className="w-full">
        <Button onClick={pushSignIn} className="w-full">
          로그인 하러가기
        </Button>
        <Button variant="secondary" onClick={pushBack} className="w-full">
          취소
        </Button>
      </XStack>
    </Modal>
  )
}
