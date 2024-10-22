import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function useSignOut() {
  const queryClient = getQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async () => {
      await supabase.auth.signOut()
      queryClient.removeQueries()
      alert('로그아웃 하였습니다.')
      router.refresh()
    },
  })
}
