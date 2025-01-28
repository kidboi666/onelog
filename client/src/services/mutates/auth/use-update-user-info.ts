import { createAuthAdapter } from '@/src/adapters/index'
import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { IUpdateUserInfo } from '@/src/types/auth'
import { ToastType } from '@/src/types/enums/index'
import { ROUTES } from '@/src/routes'

export default function useUpdateUserInfo() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationFn: (params: IUpdateUserInfo) =>
      createAuthAdapter(supabase).updateUserInfo(params),
    onSuccess: () => {
      const queryKeys = [QUERY_KEY.AUTH.INFO, QUERY_KEY.AUTH.SESSION]
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )

      openToast({
        text: TOAST_MESSAGE.USER_INFO.EDIT.SUCCESS,
        type: ToastType.SUCCESS,
      })

      router.replace(ROUTES.MODAL.SUCCESS)
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.USER_INFO.EDIT.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
      })
    },
  })
}
