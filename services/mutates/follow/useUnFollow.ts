import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { queryKey } from '@/lib/tanstack/query-key'
import { useMutation } from '@tanstack/react-query'

interface Params {
  followed_user_id: string
  follower_user_id: string
}

export default function useUnFollow() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: Params) => {
      const { error } = await supabase
        .from('follow')
        .delete()
        .eq('followed_user_id', params.followed_user_id)
        .eq('follower_user_id', params.follower_user_id)

      if (error) {
        console.error('언팔로우 실패:', error)
      }
    },

    onSettled: (_, __, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKey.follow.follower(variables.followed_user_id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.follow.count.follower(variables.followed_user_id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.follow.following(variables.follower_user_id),
      })
      queryClient.invalidateQueries({
        queryKey: queryKey.follow.count.following(variables.follower_user_id),
      })
    },
  })
}
