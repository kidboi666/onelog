import { Tables } from '@/types/supabase'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'

export const todoQuery = {
  getTodoInProgress: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'todo'>[]>({
      queryKey: ['todo', 'in_progress'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)
          .is('is_complete', false)

        if (error) {
          throw error
        }

        return data
      },
    }),

  getTodoInCompleted: (supabase: SupabaseClient, userId: string) =>
    queryOptions<Tables<'todo'>[]>({
      queryKey: ['todo', 'completed'],
      queryFn: async () => {
        const { data, error } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)
          .is('is_complete', true)

        if (error) {
          throw error
        }

        return data
      },
    }),

  getTodoFromFolder: (
    supabase: SupabaseClient,
    userId: string,
    folderId: number,
  ) =>
    queryOptions<Tables<'todo'>[]>({
      queryKey: ['todo', folderId],
      queryFn: async () => {
        let myTodo
        const { data, error } = await supabase
          .from('todo')
          .select()
          .eq('user_id', userId)

        if (error) {
          throw error
        }

        if (data) {
          myTodo = data.filter(
            (todoFolder: Tables<'todo'>) => todoFolder.folder_id === folderId,
          )
        }
        return myTodo || []
      },
    }),
}
