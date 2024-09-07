import { supabase } from '@/lib/supabase/client'
import { useMutation } from '@tanstack/react-query'

interface IImageUrl {
  userId: string
  imageUrl: string
}

export default function useDeleteAvatarImage() {
  return useMutation({
    mutationFn: async (params: IImageUrl) => {
      return supabase.storage
        .from('profile_image')
        .remove([`${params.userId}/${params.imageUrl}`])
    },
  })
}
