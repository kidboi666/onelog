import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useSignInOAuth = () => {
  const router = useRouter()
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async () => {
      const { data } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: 'http://localhost:3000/mypage',
        },
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'info'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'session'] })
    },
  })
}
