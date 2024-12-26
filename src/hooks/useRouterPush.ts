import { useRouter } from 'next/navigation'

export default function useRouterPush(
  route: string,
  scroll: boolean | undefined = true,
): () => void {
  const router = useRouter()

  return (): void => {
    router.push(route, { scroll })
  }
}
