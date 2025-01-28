import { TodoFolderColorType } from '@/src/types/enums/index'

export interface ITodoBaseAdapter {
  getTodoFolder(userId: string): Promise<ITodoFolder[]>
  getTodoInProgress(userId: string): Promise<ITodo[]>
  getTodoInCompleted(userId: string): Promise<ITodo[]>
  getTodoFromFolder(params: IGetTodoFromFolder): Promise<ITodo[]>
  getTodoIndex(params: IGetTodoIndex): Promise<ITodo[]>
  createTodo(params: ICreateTodo): Promise<void>
  createTodoFolder(params: ICreateTodoFolder): Promise<void>
  updateTodo(params: IUpdateTodo): Promise<void>
  updateTodoFolder(params: IUpdateTodoFolder): Promise<void>
  deleteTodo(params: IDeleteTodo): Promise<void>
  deleteTodoFolder(folderId: number): Promise<void>
}

export interface ITodo {
  id: number
  name: string
  createdAt: number
  updatedAt: number
  isSuccess: boolean
  folderId: number
  memo?: string
}

export interface ITodoFolder {
  color: TodoFolderColorType
  createdAt: string
  id: number
  index: number
  name: string
  userId: string
}

export interface ICreateTodo {
  name: string
  folderId: number
  userId?: string
  index: number
}

export interface ICreateTodoFolder {
  name: string
  color: TodoFolderColorType
  index: number
  userId: string
}

export interface IDeleteTodo {
  todoId: number
  folderId: number
}

export interface IUpdateTodo {
  id: number
  name: string
  folderId: number
  userId: string
  memo: string
  isComplete: boolean
  updatedAt: string
  index: number
}

export interface IUpdateTodoFolder {
  id: number
  name: string
  color: TodoFolderColorType
  index: number
}

export interface IGetTodoFromFolder {
  meId: string
  folderId: number
}

export interface IGetTodoIndex {
  meId: string
  folderId: number
}
