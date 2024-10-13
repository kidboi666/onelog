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
      const { data, error } = await supabase
        .from('follow')
        .insert({ ...params })
        .select()

      if (error) {
        console.error('팔로우 실패:', error)
      }

      return data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['follower', variables.followed_user_id],
      })
    },
  })
}
