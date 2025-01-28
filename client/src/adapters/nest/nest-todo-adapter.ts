import {
  ICreateTodo,
  ICreateTodoFolder,
  IDeleteTodo,
  IGetTodoFromFolder,
  IGetTodoIndex,
  ITodo,
  ITodoBaseAdapter,
  ITodoFolder,
  IUpdateTodo,
  IUpdateTodoFolder,
} from '@/src/types/todo'

export class NestTodoAdapter implements ITodoBaseAdapter {
  getTodoFromFolder(params: IGetTodoFromFolder): Promise<ITodo[]> {
    return Promise.resolve([])
  }

  getTodoInCompleted(userId: string): Promise<ITodo[]> {
    return Promise.resolve([])
  }

  getTodoInProgress(userId: string): Promise<ITodo[]> {
    return Promise.resolve([])
  }

  getTodoIndex(params: IGetTodoIndex): Promise<ITodo[]> {
    return Promise.resolve([])
  }

  createTodo(params: ICreateTodo): Promise<void> {
    return Promise.resolve(undefined)
  }

  createTodoFolder(params: ICreateTodoFolder): Promise<void> {
    return Promise.resolve(undefined)
  }

  deleteTodo(params: IDeleteTodo): Promise<void> {
    return Promise.resolve(undefined)
  }

  deleteTodoFolder(folderId: number): Promise<void> {
    return Promise.resolve(undefined)
  }

  getTodoFolder(userId: string): Promise<ITodoFolder[]> {
    return Promise.resolve([])
  }

  updateTodo(params: IUpdateTodo): Promise<void> {
    return Promise.resolve(undefined)
  }

  updateTodoFolder(params: IUpdateTodoFolder): Promise<void> {
    return Promise.resolve(undefined)
  }
}
