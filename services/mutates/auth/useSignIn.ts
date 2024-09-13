import { supabase } from '@/lib/supabase/client'
import { ISignIn } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export default function useSignIn() {
  const router = useRouter()

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
      router.replace('/home')
    },
  })
}
