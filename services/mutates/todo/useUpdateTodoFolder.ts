import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

interface ITodoFolder {
  name: string
  color: string
  index: number
}

export default function useUpdateTodoFolder() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (params: ITodoFolder) => {
      return supabase
        .from('todo_folder')
        .update({ ...params })
        .select()
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo_folder'] })
    },
  })
}
