import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { ISignIn } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function useSignIn() {
  const router = useRouter()
  const queryClient = getQueryClient()

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
      router.back()
      window.location.href = '/home'
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'session'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'info'] })
    },
  })
}
