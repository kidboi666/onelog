import { TOAST_MESSAGE } from '@/src/constants'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { TOAST_TYPE, useToast } from '@/src/store/useToast'

interface IDeleteComment {
  postId: number
  commentId: number
}

export default function useDeleteComment() {
  const queryClient = getQueryClient()
  const router = useRouter()
  const { openToast } = useToast()

  return useMutation({
    mutationFn: async ({ postId, commentId }: IDeleteComment) => {
      const { error } = await supabase
        .from('comment')
        .delete()
        .eq('post_id', postId)
        .eq('id', commentId)
        .select()

      if (error) {
        console.error(error)
        throw error
      }

      void queryClient.invalidateQueries({
        queryKey: QUERY_KEY.POST.DETAIL(postId),
      })
    },
    onError: (error) => {
      openToast({
        text: TOAST_MESSAGE.COMMENT.DELETE.EXCEPTION,
        message: error.message,
        type: TOAST_TYPE.ERROR,
      })
    },
    onSettled: () => {
      openToast({
        text: TOAST_MESSAGE.COMMENT.DELETE.SUCCESS,
        type: TOAST_TYPE.SUCCESS,
      })

      router.back()
    },
  })
}
