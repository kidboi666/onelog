import { createAuthAdapter } from '@/src/adapters'
import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ISignIn } from '@/src/types/auth'
import { ToastType } from '@/src/types/enums/index'
import { ROUTES } from '@/src/routes'

export default function useSignIn() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (authData: ISignIn) =>
      createAuthAdapter(supabase).signIn(authData),
    onSuccess: () => {
      window.location.href = ROUTES.HOME
      openToast({
        text: TOAST_MESSAGE.AUTH.SIGN_IN.SUCCESS,
        type: ToastType.SUCCESS,
        message: TOAST_MESSAGE.AUTH.SIGN_IN.MESSAGE,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.AUTH.SIGN_IN.EXCEPTION,
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
