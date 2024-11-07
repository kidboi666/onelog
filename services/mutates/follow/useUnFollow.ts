import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface Params {
  follower_user_id: string
  followed_user_id: string
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
      // queryClient.setQueryData(['follower',variables.followed_user_id], (oldData) => oldData ? oldData.filter((follow) => ))
      queryClient.invalidateQueries({
        queryKey: ['follower', variables.followed_user_id],
      })
      queryClient.invalidateQueries({
        queryKey: ['following', variables.follower_user_id],
      })
      queryClient.invalidateQueries({
        queryKey: ['follower', 'count', variables.followed_user_id],
      })
      queryClient.invalidateQueries({
        queryKey: ['following', 'count', variables.follower_user_id],
      })
    },
  })
}
