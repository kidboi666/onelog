import { supabase } from '@/lib/supabase/client'
import { ISignUp } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function useSignUp() {
  const router = useRouter()

  return useMutation({
    mutationFn: async (authData: ISignUp) => {
      const { data, error } = await supabase.auth.signUp({
        email: authData.email,
        password: authData.password,
        options: {
          data: {
            user_name: authData.userName,
          },
        },
      })
      if (error) {
        throw error
      }
      return data
    },
    onSuccess: () => {
      router.replace('/home')
    },
  })
}
