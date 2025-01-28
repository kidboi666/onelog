import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'
import { isDevelop } from '@/src/utils/client-utils'

const getRedirectUri = () => {
  return isDevelop
    ? 'http://localhost:3000'
    : 'https://one-sentence-gray.vercel.app'
}

export const useSignInOauth = () => {
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
        type: ToastType.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.OAUTH.SIGN_IN.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
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
