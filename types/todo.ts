export type TTodoColor =
  | 'black'
  | 'green'
  | 'yellow'
  | 'blue'
  | 'orange'
  | 'red'
  | 'purple'

export interface Todo {
  id: number
  name: string
  createdAt: number
  updatedAt: number
  isSuccess: boolean
}

export interface TodoFolder {
  id: number
  name: string
  createdAt: number
  updatedAt: number
  dotColor: TTodoColor
  index: number
}
