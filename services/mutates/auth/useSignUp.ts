import { createBrowserClient } from '@/lib/supabase/client'
import { ISignUp } from '@/types/auth'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useSignUp = () => {
  const supabase = createBrowserClient()
  const router = useRouter()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (authData: ISignUp) => {
      const { data, error } = await supabase.auth.signUp({
        email: authData.email,
        password: authData.password,
        options: {
          data: {
            nickname: authData.nickname,
            avatar_url: '',
          },
        },
      })
      if (error) {
        throw error
      }
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me'] })
      router.replace('/user')
    },
  })
}
