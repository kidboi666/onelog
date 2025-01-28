import { createFollowAdapter } from '@/src/adapters/index'
import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'

interface Params {
  followedUserId: string
  followerUserId: string
  isFollowing: boolean
}

export default function useHandleFollow() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async (params: Params) => {
      const { isFollowing, followedUserId, followerUserId } = params
      const adapter = createFollowAdapter(supabase)
      let result
      if (isFollowing) {
        result = await adapter.deleteFollow({ followedUserId, followerUserId })
      } else {
        result = await adapter.createFollow({ followedUserId, followerUserId })
      }
      return result
    },
    onSuccess: (data) => {
      if (data) {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.SEND.SUCCESS,
          type: ToastType.SUCCESS,
        })
      }
    },
    onError: (error, variables) => {
      const { isFollowing } = variables

      if (isFollowing) {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.CANCEL.EXCEPTION,
          message: error.message,
          type: ToastType.ERROR,
        })
      } else {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.SEND.EXCEPTION,
          message: error.message,
          type: ToastType.ERROR,
        })
      }
    },
    onSettled: (_, __, variables) => {
      const { isFollowing, followedUserId, followerUserId } = variables

      if (isFollowing) {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.CANCEL.SUCCESS,
          type: ToastType.SUCCESS,
        })
      }

      const queryKeys = [
        QUERY_KEY.FOLLOW.FOLLOWER(followedUserId),
        QUERY_KEY.FOLLOW.COUNT.FOLLOWER(followedUserId),
        QUERY_KEY.FOLLOW.FOLLOWING(followerUserId),
        QUERY_KEY.FOLLOW.COUNT.FOLLOWING(followerUserId),
      ]
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )
    },
  })
}
