import { useMutation } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'

export default function useDeletePost() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (postId: number) => {
      return supabase.from('post').delete().eq('id', postId).select()
    },
    onSettled: (_, __, postId) => {
      void queryClient.invalidateQueries({ queryKey: queryKey.post.public })
      void queryClient.invalidateQueries({
        queryKey: queryKey.post.detail(postId),
      })
    },
  })
}
