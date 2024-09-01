import { getQueryClient } from '@/lib/get-query-client'
import { createBrowserClient } from '@/lib/supabase/client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function useSignOut() {
  const supabase = createBrowserClient()
  const queryClient = getQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut()
      queryClient.removeQueries({ queryKey: ['me'] })
      queryClient.removeQueries({ queryKey: ['me', 'session'] })
      alert('로그아웃 하였습니다.')
      router.refresh()
    },
  })
}
