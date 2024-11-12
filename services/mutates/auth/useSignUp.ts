import { supabase } from '@/lib/supabase/client'
import { routes } from '@/routes'
import { ISignUp } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'

export default function useSignUp() {
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
      window.location.href = routes.home
    },
  })
}
