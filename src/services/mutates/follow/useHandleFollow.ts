import { TOAST_MESSAGE } from '@/src/constants/toast-message'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

interface Params {
  followed_user_id: string
  follower_user_id: string
  isFollowing: boolean
}

export default function useHandleFollow() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: Params) => {
      const { isFollowing, followed_user_id, follower_user_id } = params
      let query: any = supabase.from('follow')

      if (isFollowing) {
        query = query
          .delete()
          .eq('followed_user_id', followed_user_id)
          .eq('follower_user_id', follower_user_id)
      } else {
        query = query
          .insert({
            followed_user_id,
            follower_user_id,
          })
          .select()
      }

      const { data, error } = await query

      if (error) {
        console.error(error)
        throw error
      }

      return data
    },
    onSuccess: (data) => {
      if (data) {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.SEND.SUCCESS,
          type: TOAST_TYPE.SUCCESS,
        })
      }
    },
    onError: (error, variables) => {
      const { isFollowing } = variables

      if (isFollowing) {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.CANCEL.EXCEPTION,
          message: error.message,
          type: TOAST_TYPE.ERROR,
        })
      } else {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.SEND.EXCEPTION,
          message: error.message,
          type: TOAST_TYPE.ERROR,
        })
      }
    },
    onSettled: (_, __, variables) => {
      const { isFollowing, followed_user_id, follower_user_id } = variables

      if (isFollowing) {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.CANCEL.SUCCESS,
          type: TOAST_TYPE.SUCCESS,
        })
      }

      const queryKeys = [
        queryKey.follow.follower(followed_user_id),
        queryKey.follow.count.follower(followed_user_id),
        queryKey.follow.following(follower_user_id),
        queryKey.follow.count.following(follower_user_id),
      ]
      queryKeys.forEach((queryKey) => queryClient.invalidateQueries({ queryKey }))
    },
  })
}
