import { supabase } from '@/lib/supabase/client'
import { Tables } from '@/types/supabase'
import { queryOptions } from '@tanstack/react-query'

export const todoQuery = {
  getTodoInProgress: (userId: string) =>
    queryOptions({
      queryKey: ['todo'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)
          .is('is_complete', false)
          .single()

        if (error) {
          throw error
        }

        return data
      },
    }),
  getTodoFromFolder: (folderId: number, userId: string) =>
    queryOptions({
      queryKey: ['todo', folderId],
      queryFn: async () => {
        let myTodo
        const { data, error } = await supabase
          .from('todo')
          .select()
          .eq('id', folderId)
          .single()

        if (error) {
          throw error
        }

        if (data) {
          myTodo = data.filter(
            (todoFolder: Tables<'todo'>) => todoFolder.user_id === userId,
          )
        }
        return myTodo
      },
    }),
}
