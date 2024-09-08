import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { isDevelop } from '@/utils/isDevelop'
import { useMutation } from '@tanstack/react-query'

export const useSignInOAuth = () => {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async () => {
      let redirectToUri
      isDevelop
        ? (redirectToUri = 'http://localhost:3000')
        : (redirectToUri = 'https://one-sentence-gray.vercel.app')

      const { data } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${redirectToUri}/oauth/kakao/callback`,
        },
      })
      return data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['me', 'info'] })
      queryClient.invalidateQueries({ queryKey: ['me', 'session'] })
    },
  })
}
