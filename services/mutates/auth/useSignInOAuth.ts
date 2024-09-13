import { supabase } from '@/lib/supabase/client'
import { isDevelop } from '@/utils/isDevelop'
import { useMutation } from '@tanstack/react-query'

const getRedirectUri = () => {
  return isDevelop
    ? 'http://localhost:3000'
    : 'https://one-sentence-gray.vercel.app'
}

export const useSignInOAuth = () => {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${getRedirectUri()}/oauth/kakao/callback`,
        },
      })
      if (error) {
        throw error
      }
      return data
    },
  })
}
