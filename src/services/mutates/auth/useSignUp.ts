import { routes } from '@/src/routes'
import { useMutation } from '@tanstack/react-query'

import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'

import { ISignUp } from '@/src/types/auth'

export default function useSignUp() {
  const queryClient = getQueryClient()

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
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.auth.info })
      queryClient.invalidateQueries({ queryKey: queryKey.auth.session })
    },
  })
}
