import {
  ICreateTodo,
  ICreateTodoFolder,
  IDeleteTodo,
  IGetTodoFromFolder,
  IGetTodoIndex,
  ITodoFolder,
  IUpdateTodo,
  IUpdateTodoFolder,
} from '@/src/types/dtos/todo'
import { ITodo } from '@/src/types/entities/todo'
import { ITodoBaseAdapter } from '@/src/types/services/index'

export const createNestTodoAdapter = (): ITodoBaseAdapter => {
  const getTodoFromFolder = (params: IGetTodoFromFolder): Promise<ITodo[]> => {
    return Promise.resolve([])
  }

  const getTodoInCompleted = (userId: string): Promise<ITodo[]> => {
    return Promise.resolve([])
  }

  const getTodoInProgress = (userId: string): Promise<ITodo[]> => {
    return Promise.resolve([])
  }

  const getTodoIndex = (params: IGetTodoIndex): Promise<ITodo[]> => {
    return Promise.resolve([])
  }

  const createTodo = (params: ICreateTodo): Promise<void> => {
    return Promise.resolve(undefined)
  }

  const createTodoFolder = (params: ICreateTodoFolder): Promise<void> => {
    return Promise.resolve(undefined)
  }

  const deleteTodo = (params: IDeleteTodo): Promise<void> => {
    return Promise.resolve(undefined)
  }

  const deleteTodoFolder = (folderId: number): Promise<void> => {
    return Promise.resolve(undefined)
  }

  const getTodoFolder = (userId: string): Promise<ITodoFolder[]> => {
    return Promise.resolve([])
  }

  const updateTodo = (params: IUpdateTodo): Promise<void> => {
    return Promise.resolve(undefined)
  }

  const updateTodoFolder = (params: IUpdateTodoFolder): Promise<void> => {
    return Promise.resolve(undefined)
  }

  return {
    getTodoFromFolder,
    getTodoInCompleted,
    getTodoInProgress,
    getTodoIndex,
    createTodo,
    createTodoFolder,
    deleteTodo,
    deleteTodoFolder,
    getTodoFolder,
    updateTodo,
    updateTodoFolder,
  }
}
