import { uploadAvatarImage } from '@/src/services/supabase/auth'
import { TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/src/store/hooks/useToast'
import { IUploadAvatar } from '@/src/types/entities/auth'
import { Toast } from '@/src/types/enums/index'

export default function useUploadAvatarImage() {
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (params: IUploadAvatar) =>
      uploadAvatarImage(params),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.USER_INFO.UPLOAD_AVATAR.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
  })
}
