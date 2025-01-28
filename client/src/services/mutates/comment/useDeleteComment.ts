import { TOAST_MESSAGE } from '@/src/constants'
import { QUERY_KEY } from '@/src/constants/query-key'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useToast } from '@/src/store/hooks/useToast'
import { ToastType } from '@/src/types/enums/index'

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
        type: ToastType.ERROR,
      })
    },
    onSettled: () => {
      openToast({
        text: TOAST_MESSAGE.COMMENT.DELETE.SUCCESS,
        type: ToastType.SUCCESS,
      })

      router.back()
    },
  })
}
