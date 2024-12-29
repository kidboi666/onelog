import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'
import { isDevelop } from '@/src/utils/isDevelop'

const getRedirectUri = () => {
  return isDevelop ? 'http://localhost:3000' : 'https://one-sentence-gray.vercel.app'
}

export const useSignInOAuth = () => {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${getRedirectUri()}/oauth/kakao/callback`,
        },
      })

      if (error) {
        console.error(error)
        throw error
      }

      return data
    },
    onSuccess: () => {
      openToast({
        text: TOAST_MESSAGE.OAUTH.SIGN_IN.SUCCESS,
        message: TOAST_MESSAGE.OAUTH.SIGN_IN.MESSAGE,
        type: TOAST_TYPE.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.OAUTH.SIGN_IN.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
    onSettled: () => {
      const queryKeys = [queryKey.auth.info, queryKey.auth.session]
      queryKeys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))
    },
  })
}
