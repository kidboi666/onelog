import { supabase } from '@/lib/supabase/client'
import { queryOptions } from '@tanstack/react-query'

export const todoFolderQuery = {
  getTodoFolder: (userId: string) =>
    queryOptions({
      queryKey: ['todo_folder'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('todo_folder')
          .select()
          .eq('user_id', userId)
          .single()

        if (error) {
          throw error
        }

        return data
      },
    }),
}
