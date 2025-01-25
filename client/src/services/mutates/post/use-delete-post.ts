import { createPostAdapter } from '@/src/adapters'
import { TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

export default function useDeletePost() {
  const queryClient = getQueryClient()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: (postId: number) =>
      createPostAdapter(supabase).deletePost(postId),
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.POST.DELETE.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
    onSettled: (_, __, postId) => {
      const queryKeys = [QUERY_KEY.POST.PUBLIC, QUERY_KEY.POST.DETAIL(postId)]
      queryKeys.forEach((queryKey) =>
        queryClient.invalidateQueries({ queryKey }),
      )
      openToast({
        text: TOAST_MESSAGE.POST.DELETE.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
      })
    },
  })
}
