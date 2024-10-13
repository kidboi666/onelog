import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface Params {
  followed_user_id: string
  follower_user_id: string
}

export default function useFollow() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: Params) => {
      return supabase
        .from('follow')
        .insert({ ...params })
        .select()
    },
  })
}
