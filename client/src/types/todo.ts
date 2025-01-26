export type TTodoColor =
  | 'black'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'orange'
  | 'red'
  | 'purple'

export interface ITodoBaseAdapter {
  getTodoInProgress: (userId: string) => Promise<ITodo[]>
  getTodoInCompleted: (userId: string) => Promise<ITodo[]>
  getTodoFromFolder: (params: IGetTodoFromFolder) => Promise<ITodo[]>
  getTodoIndex: (params: IGetTodoIndex) => Promise<ITodo[]>
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

export interface TTodo {
  pending: ITodo[]
  success: ITodo[]
}

export interface TodoFolder {
  id: number
  name: string
  createdAt: number
  updatedAt: number
  dotColor: TTodoColor
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
