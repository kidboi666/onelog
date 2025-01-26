import {
  IGetTodoFromFolder,
  IGetTodoIndex,
  ITodo,
  ITodoBaseAdapter,
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
}
