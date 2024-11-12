import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { routes } from '@/routes'
import { ISignIn } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'

export default function useSignIn() {
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
      window.location.href = routes.home
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'session'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'info'] })
    },
  })
}
