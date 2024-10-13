import { supabase } from '@/lib/supabase/client'
import { useMutation } from '@tanstack/react-query'

interface Params {
  follower_user_id: string
  followed_user_id: string
}

export default function useUnFollow() {
  return useMutation({
    mutationFn: async (params: Params) => {
      return supabase
        .from('follow')
        .delete()
        .match({ ...params })
    },
  })
}
