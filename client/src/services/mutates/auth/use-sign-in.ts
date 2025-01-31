import { authAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useMe } from '@/src/store/hooks/useMe'
import { useToast } from '@/src/store/hooks/useToast'
import { ISignIn } from '@/src/types/dtos/auth'
import { Toast } from '@/src/types/enums/index'
import { ROUTES } from '@/src/routes'

export default function useSignIn() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()
  const { setMe } = useMe()

  return useMutation({
    mutationFn: (authData: ISignIn) => authAdapter.signIn(authData),
    onSuccess: () => {
      window.location.href = ROUTES.HOME
      openToast({
        text: TOAST_MESSAGE.AUTH.SIGN_IN.SUCCESS,
        type: Toast.SUCCESS,
        message: TOAST_MESSAGE.AUTH.SIGN_IN.MESSAGE,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.AUTH.SIGN_IN.EXCEPTION,
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
