import { createAuthAdapter } from '@/src/adapters/index'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'

export default function useDeleteAvatarImage() {
  return useMutation({
    mutationFn: (imageUrl: string) =>
      createAuthAdapter(supabase).deleteAvatarImage(imageUrl),
  })
}
