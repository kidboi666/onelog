'use client'

import { useTransition } from 'react'
import { useRouter } from 'next/navigation'

export default function useRouterPushWithTransition(
  route: string,
): [boolean, () => void] {
  const [isLoading, startTransition] = useTransition()
  const router = useRouter()

  const handleStartTransition = (): void => {
    startTransition(() => router.push(route))
  }

  return [isLoading, handleStartTransition]
}
