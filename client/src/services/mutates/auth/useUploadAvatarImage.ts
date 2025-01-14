import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

interface IFile {
  email?: string | null
  image: File | null
}

export default function useUploadAvatarImage() {
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: IFile) => {
      const { data, error } = await supabase.storage
        .from('profile_image')
        .upload(`${params.email}/${new Date().getTime()}`, params.image!)

      if (error) {
        console.error(error)
        throw error
      }

      return `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BASE_URL!}/${data?.fullPath}`
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.USER_INFO.UPLOAD_AVATAR.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
  })
}
