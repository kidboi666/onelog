import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface IDeleteTodo {
  todoId: number
  folderId: number
}

export default function useDeleteTodo() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: IDeleteTodo) => {
      return supabase.from('todo').delete().eq('id', params.todoId)
    },
    onSuccess(_, variables) {
      queryClient.invalidateQueries({ queryKey: ['todo', variables.folderId] })
    },
  })
}
