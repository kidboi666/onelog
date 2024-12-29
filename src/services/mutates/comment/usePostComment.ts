import { routes } from '@/src/routes'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'

interface IComment {
  userId?: string
  content: string
  postId: number
  commentId: number | null
}

export default function usePostComment() {
  const queryClient = getQueryClient()
  const router = useRouter()

  return useMutation({
    mutationFn: async (params: IComment) => {
      return supabase
        .from('comment')
        .insert({
          user_id: params.userId,
          content: params.content,
          post_id: params.postId,
          comment_id: params.commentId || null,
        })
        .select()
        .single()
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
