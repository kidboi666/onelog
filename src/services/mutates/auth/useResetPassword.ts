import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'

export default function useResetPassword() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await supabase.auth.resetPasswordForEmail(email)
      if (error) {
        throw error
      }
      return data
    },
  })
}
