import { createAuthAdapter } from '@/src/adapters/index'
import { TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { useToast } from '@/src/store/hooks/useToast'
import { IUploadAvatar } from '@/src/types/auth'
import { ToastType } from '@/src/types/enums/index'

export default function useUploadAvatarImage() {
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: IUploadAvatar) =>
      createAuthAdapter(supabase).uploadAvatarImage(params),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.USER_INFO.UPLOAD_AVATAR.EXCEPTION,
        message: error.message,
        type: ToastType.ERROR,
      })
    },
  })
}
