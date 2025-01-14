import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'
import { ISignUp } from '@/src/types/auth'
import { ROUTES } from '@/src/routes'

export default function useSignUp() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (authData: ISignUp) => {
      const { data, error } = await supabase.auth.signUp({
        email: authData.email,
        password: authData.password,
        options: {
          data: {
            user_name: authData.userName,
            avatar_url: '',
            about_me: '',
            mbti: '',
          },
        },
      })

      if (error) {
        console.error(error)
        throw error
      }

      return data
    },
    onSuccess: () => {
      window.location.href = ROUTES.HOME
      openToast({
        text: TOAST_MESSAGE.OAUTH.SIGN_UP.SUCCESS,
        message: TOAST_MESSAGE.OAUTH.SIGN_UP.MESSAGE,
        type: TOAST_TYPE.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.OAUTH.SIGN_UP.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
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
