import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface ITodo {
  name: string
  memo?: string
  folderId: string
  userId: string
  isComplete?: boolean
  index: number
}

export default function useUpdateTodo() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: ITodo) => {
      return supabase
        .from('todo')
        .update({
          name: params.name,
          folder_id: params.folderId,
          user_id: params.userId,
          memo: params.memo,
          is_complete: params.isComplete,
          index: params.index,
        })
        .select()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todo', variables.folderId] })
    },
  })
}
