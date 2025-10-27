import { queryOptions } from "@tanstack/react-query";
import {
  getTodoFolder,
  getTodoFromFolder,
  getTodoInCompleted,
  getTodoIndex,
  getTodoInProgress,
} from "@/entities/todo/api/todo-api";
import { TODO_QUERY_KEY } from "@/entities/todo/model/constants";
import type { ITodo, ITodoFolder } from "@/entities/todo/model/types";

export const todoQuery = {
  getTodoFromFolder: (meId: string, folderId: number) =>
    queryOptions<ITodo[]>({
      queryKey: TODO_QUERY_KEY.FOLDER(folderId),
      queryFn: () => getTodoFromFolder({ meId, folderId }),
    }),

  getTodoInProgress: (meId: string) =>
    queryOptions<ITodo[]>({
      queryKey: TODO_QUERY_KEY.IN_PROGRESS,
      queryFn: () => getTodoInProgress(meId),
    }),

  getTodoInCompleted: (meId: string) =>
    queryOptions<ITodo[]>({
      queryKey: TODO_QUERY_KEY.COMPLETED,
      queryFn: () => getTodoInCompleted(meId),
    }),

  getTodoIndex: (meId: string, folderId: number) =>
    queryOptions({
      queryKey: TODO_QUERY_KEY.INDEX(folderId),
      queryFn: () => getTodoIndex({ meId, folderId }),
    }),

  getTodoFolder: (meId: string) =>
    queryOptions<ITodoFolder[]>({
      queryKey: TODO_QUERY_KEY.MAIN,
      queryFn: () => getTodoFolder(meId),
    }),
};
