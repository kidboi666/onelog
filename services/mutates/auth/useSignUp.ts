import { supabase } from '@/lib/supabase/client'
import { ISignUp } from '@/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function useSignUp() {
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (authData: ISignUp) => {
      const { data, error } = await supabase.auth.signUp({
        email: authData.email,
        password: authData.password,
        options: {
          data: {
            user_name: authData.userName,
            avatar_url: '',
            about_me: '',
          },
        },
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'info'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'session'] })
      router.replace('/mypage')
    },
  })
}
