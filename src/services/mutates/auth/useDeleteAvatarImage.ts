import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'

export default function useDeleteAvatarImage() {
  return useMutation({
    mutationFn: async (imageUrl: string) => {
      const splitPath = imageUrl.split('/')
      const email = splitPath[splitPath.length - 2]
      const fileName = splitPath[splitPath.length - 1]

      return supabase.storage
        .from('profile_image')
        .remove([`${email}/${fileName}`])
    },
  })
}
