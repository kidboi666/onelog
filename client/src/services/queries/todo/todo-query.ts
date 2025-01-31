import { todoAdapter } from '@/src/adapters/create-client-adapter'
import { QUERY_KEY } from '@/src/constants/index'
import { queryOptions } from '@tanstack/react-query'
import { ITodoFolder } from '@/src/types/dtos/todo'
import { ITodo } from '@/src/types/entities/todo'

export const todoQuery = {
  getTodoFromFolder: (meId: string, folderId: number) =>
    queryOptions<ITodo[]>({
      queryKey: QUERY_KEY.TODO.FOLDER(folderId),
      queryFn: () => todoAdapter.getTodoFromFolder({ meId, folderId }),
    }),

  getTodoInProgress: (meId: string) =>
    queryOptions<ITodo[]>({
      queryKey: QUERY_KEY.TODO.IN_PROGRESS,
      queryFn: () => todoAdapter.getTodoInProgress(meId),
    }),

  getTodoInCompleted: (meId: string) =>
    queryOptions<ITodo[]>({
      queryKey: QUERY_KEY.TODO.COMPLETED,
      queryFn: () => todoAdapter.getTodoInCompleted(meId),
    }),

  getTodoIndex: (meId: string, folderId: number) =>
    queryOptions({
      queryKey: QUERY_KEY.TODO.INDEX(folderId),
      queryFn: () => todoAdapter.getTodoIndex({ meId, folderId }),
    }),

  getTodoFolder: (meId: string) =>
    queryOptions<ITodoFolder[]>({
      queryKey: QUERY_KEY.TODO.MAIN,
      queryFn: () => todoAdapter.getTodoFolder(meId),
    }),
}
