import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { useMutation } from '@tanstack/react-query'

export default function useDeleteTodoFolder() {
  const queryClient = getQueryClient()

  return useMutation({
    mutationFn: async (folderId: number) => {
      return supabase.from('todo_folder').delete().eq('id', folderId)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todo_folder'] })
    },
  })
}
