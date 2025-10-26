import { createFollow, deleteFollow } from '@/src/services/supabase/follow'
import { QUERY_KEY, TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { Toast } from '@/src/types/enums/index'

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
      let result
      if (isFollowing) {
        result = await deleteFollow({
          followedUserId,
          followerUserId,
        })
      } else {
        result = await createFollow({
          followedUserId,
          followerUserId,
        })
      }
      return result
    },
    onSuccess: (data) => {
      if (data) {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.SEND.SUCCESS,
          type: Toast.SUCCESS,
        })
      }
    },
    onError: (error, variables) => {
      const { isFollowing } = variables

      if (isFollowing) {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.CANCEL.EXCEPTION,
          message: error.message,
          type: Toast.ERROR,
        })
      } else {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.SEND.EXCEPTION,
          message: error.message,
          type: Toast.ERROR,
        })
      }
    },
    onSettled: (_, __, variables) => {
      const { isFollowing, followedUserId, followerUserId } = variables

      if (isFollowing) {
        openToast({
          text: TOAST_MESSAGE.FOLLOW.CANCEL.SUCCESS,
          type: Toast.SUCCESS,
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
