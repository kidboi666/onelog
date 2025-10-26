import {
  getTodoFromFolder,
  getTodoInProgress,
  getTodoInCompleted,
  getTodoIndex,
  getTodoFolder,
} from '@/src/services/supabase/todo'
import { QUERY_KEY } from '@/src/constants/index'
import { queryOptions } from '@tanstack/react-query'
import { ITodoFolder } from '@/src/types/dtos/todo'
import { ITodo } from '@/src/types/entities/todo'

export const todoQuery = {
  getTodoFromFolder: (meId: string, folderId: number) =>
    queryOptions<ITodo[]>({
      queryKey: QUERY_KEY.TODO.FOLDER(folderId),
      queryFn: () => getTodoFromFolder({ meId, folderId }),
    }),

  getTodoInProgress: (meId: string) =>
    queryOptions<ITodo[]>({
      queryKey: QUERY_KEY.TODO.IN_PROGRESS,
      queryFn: () => getTodoInProgress(meId),
    }),

  getTodoInCompleted: (meId: string) =>
    queryOptions<ITodo[]>({
      queryKey: QUERY_KEY.TODO.COMPLETED,
      queryFn: () => getTodoInCompleted(meId),
    }),

  getTodoIndex: (meId: string, folderId: number) =>
    queryOptions({
      queryKey: QUERY_KEY.TODO.INDEX(folderId),
      queryFn: () => getTodoIndex({ meId, folderId }),
    }),

  getTodoFolder: (meId: string) =>
    queryOptions<ITodoFolder[]>({
      queryKey: QUERY_KEY.TODO.MAIN,
      queryFn: () => getTodoFolder(meId),
    }),
}
