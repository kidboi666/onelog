import { createBrowserClient } from '@/lib/supabase/client'
import { ISignIn } from '@/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function useSignIn() {
  const supabase = createBrowserClient()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (authData: ISignIn) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authData.email,
        password: authData.password,
      })
      if (error) {
        throw error
      }
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'info'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'session'] })
      router.push('/mypage')
    },
  })
}
