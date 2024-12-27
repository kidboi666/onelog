import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export default function useRouterPush(
  path: string,
  scroll: boolean | undefined = true,
): () => void {
  const router = useRouter()

  return useCallback(() => {
    router.push(path, { scroll })
  }, [path, router, scroll])
}
