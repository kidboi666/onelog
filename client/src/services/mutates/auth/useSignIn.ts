import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'
import { ISignIn } from '@/src/types/auth'
import { createAuthAdapter } from '@/src/utils/adapter'
import { ROUTES } from '@/src/routes'

export default function useSignIn() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (authData: ISignIn) => {
      const auth = createAuthAdapter()
      return auth.signIn(authData)
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
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )
    },
  })
}
