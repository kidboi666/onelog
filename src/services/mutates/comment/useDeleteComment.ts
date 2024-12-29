import { routes } from '@/src/routes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'

interface IDeleteComment {
  postId: number
  commentId: number
}

export default function useDeleteComment() {
  const queryClient = getQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async ({ postId, commentId }: IDeleteComment) => {
      return supabase
        .from('comment')
        .delete()
        .eq('post_id', postId)
        .eq('id', commentId)
        .select()
    },
    onSuccess: () => {
      router.replace(routes.modal.success)
    },
    onSettled: (_, __, variables) => {
      const { postId } = variables
      void queryClient.invalidateQueries({
        queryKey: queryKey.post.detail(postId),
      })
    },
  })
}
