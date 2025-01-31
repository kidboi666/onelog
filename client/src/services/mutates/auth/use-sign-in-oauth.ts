import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { Toast } from '@/src/types/enums/index'
import { isDevelop } from '@/src/utils/client-utils'

export const useSignInOauth = () => {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async () => {
      const redirectUri = isDevelop
        ? 'http://localhost:3000'
        : 'https://one-sentence-gray.vercel.app'
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'kakao',
        options: {
          redirectTo: `${redirectUri}/oauth/kakao/callback`,
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
        type: Toast.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.OAUTH.SIGN_IN.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
    onSettled: () => {
      const queryKeys = [QUERY_KEY.AUTH.INFO, QUERY_KEY.AUTH.SESSION]
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )
    },
  })
}
