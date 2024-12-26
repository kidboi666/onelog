'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function useRouterPushWithTransition(): [
  boolean,
  (route: string) => void,
] {
  const [isLoading, startTransition] = useTransition()
  const router = useRouter()

  const handleStartTransition = (route: string): void => {
    startTransition(() => router.push(route))
  }

  return [isLoading, handleStartTransition]
}
