import { supabase } from '@/src/lib/supabase/client'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'
import { queryKey } from '@/src/lib/tanstack/query-key'

interface ITodoFolder {
  name: string
  color: string
  index: number
  id: number
}

export default function useUpdateTodoFolder() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: ITodoFolder) => {
      return supabase
        .from('todo_folder')
        .update({
          name: params.name,
          color: params.color,
          index: params.index,
        })
        .eq('id', params.id)
        .select()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.todo.main })
    },
  })
}
