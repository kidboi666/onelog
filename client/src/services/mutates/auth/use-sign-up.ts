import { createAuthAdapter } from '@/src/adapters'
import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ISignUp } from '@/src/types/auth'
import { ToastType } from '@/src/types/enums/index'
import { ROUTES } from '@/src/routes'

export default function useSignUp() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (authData: ISignUp) =>
      createAuthAdapter(supabase).signUp(authData),
    onSuccess: () => {
      window.location.href = ROUTES.HOME
      openToast({
        text: TOAST_MESSAGE.OAUTH.SIGN_UP.SUCCESS,
        message: TOAST_MESSAGE.OAUTH.SIGN_UP.MESSAGE,
        type: ToastType.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.OAUTH.SIGN_UP.EXCEPTION,
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
