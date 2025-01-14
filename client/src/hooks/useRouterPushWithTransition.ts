'use client'

import { useRouter } from 'next/navigation'
import { useCallback, useTransition } from 'react'

export default function useRouterPushWithTransition(
  path: string,
  scroll: boolean | undefined = true,
): [boolean, () => void] {
  const [isLoading, startTransition] = useTransition()
  const router = useRouter()

  const handleStartTransition = useCallback(() => {
    startTransition(() => router.push(path, { scroll }))
  }, [path, router, scroll, startTransition])

  return [isLoading, handleStartTransition]
}
