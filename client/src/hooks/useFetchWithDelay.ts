'use client'

import { useCallback, useEffect, useState } from 'react'
import { wait } from '@/src/utils/wait'

export default function useFetchWithDelay(pending: boolean, delay: number = 500) {
  const [isPending, setPending] = useState(false)

  const updatePendingState = useCallback(async () => {
    if (pending) {
      setPending(true)
      await wait(delay)
    }
    setPending(pending)
  }, [pending, delay])

  useEffect(() => {
    void updatePendingState()
  }, [pending, delay, updatePendingState])

  return isPending
}
