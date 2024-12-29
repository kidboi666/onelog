import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'
import { ISignIn } from '@/src/types/auth'
import { ROUTES } from '@/src/routes'

export default function useSignIn() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (authData: ISignIn) => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: authData.email,
        password: authData.password,
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
        text: TOAST_MESSAGE.AUTH.SIGN_IN.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
        message: TOAST_MESSAGE.AUTH.SIGN_IN.MESSAGE,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.AUTH.SIGN_IN.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
    onSettled: () => {
      const queryKeys = [QUERY_KEY.AUTH.INFO, QUERY_KEY.AUTH.SESSION]
      queryKeys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))
    },
  })
}
