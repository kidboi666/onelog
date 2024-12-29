import { useMutation } from '@tanstack/react-query'

import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'

interface Params {
  followed_user_id: string
  follower_user_id: string
  isFollowing: boolean
}

export default function useHandleFollow() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: Params) => {
      const { isFollowing, followed_user_id, follower_user_id } = params
      let data
      let error

      if (isFollowing) {
        ;({ data, error } = await supabase
          .from('follow')
          .delete()
          .eq('followed_user_id', followed_user_id)
          .eq('follower_user_id', follower_user_id))
      } else {
        ;({ data, error } = await supabase
          .from('follow')
          .insert({
            followed_user_id,
            follower_user_id,
          })
          .select())
      }

      if (error) {
        console.error('팔로우 실패:', error)
      }

      return data
    },
    onSettled: (_, __, variables) => {
      const { followed_user_id, follower_user_id } = variables

      void queryClient.invalidateQueries({
        queryKey: queryKey.follow.follower(followed_user_id),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKey.follow.count.follower(followed_user_id),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKey.follow.following(follower_user_id),
      })
      void queryClient.invalidateQueries({
        queryKey: queryKey.follow.count.following(follower_user_id),
      })
    },
  })
}
