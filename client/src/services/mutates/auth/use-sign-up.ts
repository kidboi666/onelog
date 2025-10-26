import { signUp } from '@/src/services/supabase/auth'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ISignUp } from '@/src/types/dtos/auth'
import { Toast } from '@/src/types/enums/index'
import { ROUTES } from '@/src/routes'

export default function useSignUp() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (authData: ISignUp) => signUp(authData),
    onSuccess: () => {
      window.location.href = ROUTES.HOME
      openToast({
        text: TOAST_MESSAGE.OAUTH.SIGN_UP.SUCCESS,
        message: TOAST_MESSAGE.OAUTH.SIGN_UP.MESSAGE,
        type: Toast.SUCCESS,
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.OAUTH.SIGN_UP.EXCEPTION,
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
