import { updateUserInfo } from '@/src/services/supabase/auth'
import { TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMe } from '@/src/store/hooks/useMe'
import { useToast } from '@/src/store/hooks/useToast'
import { IUpdateUserInfo } from '@/src/types/dtos/auth'
import { Toast } from '@/src/types/enums/index'
import { ROUTES } from '@/src/routes'

export default function useUpdateUserInfo() {
  const { setMe } = useMe()
  const { openToast } = useToast()
  const router = useRouter()

  return useMutation({
    mutationFn: (params: IUpdateUserInfo) => updateUserInfo(params),
    onSuccess: (data) => {
      setMe(data)
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
