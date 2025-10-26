import { deleteAvatarImage } from '@/src/services/supabase/auth'
import { TOAST_MESSAGE } from '@/src/constants/index'
import { useMutation } from '@tanstack/react-query'
import { useToast } from '@/src/store/hooks/useToast'
import { Toast } from '@/src/types/enums/index'

export default function useDeleteAvatarImage() {
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (imageUrl: string) => deleteAvatarImage(imageUrl),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.USER_INFO.UPLOAD_AVATAR.EXCEPTION,
        message: error.message,
        type: Toast.ERROR,
      })
    },
  })
}
