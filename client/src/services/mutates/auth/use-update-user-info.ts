import { authAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { IUpdateUserInfo } from '@/src/types/dtos/auth'
import { Toast } from '@/src/types/enums/index'
import { ROUTES } from '@/src/routes'

export default function useUpdateUserInfo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationFn: (params: IUpdateUserInfo) => authAdapter.updateUserInfo(params),
    onSuccess: () => {
      const queryKeys = [QUERY_KEY.AUTH.INFO, QUERY_KEY.AUTH.SESSION]
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )

      openToast({
        text: TOAST_MESSAGE.USER_INFO.EDIT.SUCCESS,
        type: Toast.SUCCESS,
      })

      router.replace(ROUTES.MODAL.SUCCESS)
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.USER_INFO.EDIT.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
  })
}
