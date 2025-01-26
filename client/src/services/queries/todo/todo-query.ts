import { createTodoAdapter } from '@/src/adapters/index'
import { SupabaseClient } from '@supabase/supabase-js'
import { queryOptions } from '@tanstack/react-query'
import { QUERY_KEY } from '@/src/lib/tanstack/query-key'
import { ITodo } from '@/src/types/todo'

export const todoQuery = {
  getTodoFromFolder: (
    supabase: SupabaseClient,
    meId: string,
    folderId: number,
  ) =>
    queryOptions<ITodo[]>({
      queryKey: QUERY_KEY.TODO.FOLDER(folderId),
      queryFn: () =>
        createTodoAdapter(supabase).getTodoFromFolder({ meId, folderId }),
    }),

  getTodoInProgress: (supabase: SupabaseClient, meId: string) =>
    queryOptions<ITodo[]>({
      queryKey: QUERY_KEY.TODO.IN_PROGRESS,
      queryFn: () => createTodoAdapter(supabase).getTodoInProgress(meId),
    }),

  getTodoInCompleted: (supabase: SupabaseClient, meId: string) =>
    queryOptions<ITodo[]>({
      queryKey: QUERY_KEY.TODO.COMPLETED,
      queryFn: () => createTodoAdapter(supabase).getTodoInCompleted(meId),
    }),

  getTodoIndex: (supabase: SupabaseClient, meId: string, folderId: number) =>
    queryOptions({
      queryKey: QUERY_KEY.TODO.INDEX(folderId),
      queryFn: () =>
        createTodoAdapter(supabase).getTodoIndex({ meId, folderId }),
    }),
}
