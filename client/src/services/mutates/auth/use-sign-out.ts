import { authAdapter } from '@/src/adapters/create-client-adapter'
import { TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { Toast } from '@/src/types/enums/index'
import { ROUTES } from '@/src/routes'

export default function useSignOut() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: () => authAdapter.signOut(),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.AUTH.SIGN_OUT.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
    onSettled: () => {
      queryClient.removeQueries()
      alert('로그아웃 하였습니다.')
      window.location.href = ROUTES.HOME
    },
  })
}
