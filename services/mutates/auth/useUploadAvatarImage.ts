import { supabase } from '@/lib/supabase/client'
import { useMutation } from '@tanstack/react-query'

interface IFile {
  userId: string
  image: File | null
}

export default function useUploadAvatarImage() {
  return useMutation({
    mutationFn: async (params: IFile) => {
      const { data, error } = await supabase.storage
        .from('profile_image')
        .upload(`${params.userId}/${params.image!.name}`, params.image!)

      if (error) {
        throw error
      }

      return `${process.env.NEXT_PUBLIC_SUPABASE_IMAGE_BASE_URL!}/${data?.fullPath}`
    },
  })
}
