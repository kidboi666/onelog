import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface ITodo {
  name: string
  folderId: number
  userId: string
  index: number
}

export default function useAddTodo() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: ITodo) => {
      return supabase
        .from('todo')
        .insert({
          name: params.name,
          folder_id: params.folderId,
          user_id: params.userId,
          index: params.index,
        })
        .select()
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['todo', variables.folderId] })
      queryClient.invalidateQueries({ queryKey: ['todo', 'in_progress'] })
    },
  })
}
