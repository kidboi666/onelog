import { ROUTES } from '@/src/ROUTES'
import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'
import { ISignUp } from '@/src/types/auth'

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
      window.location.href = ROUTES.home
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
      const queryKeys = [queryKey.auth.info, queryKey.auth.session]
      queryKeys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))
    },
  })
}
