/**
 * Base
 */
export interface ITodo {
  id: number
  name: string
  createdAt: string
  updatedAt: string | null
  isComplete: boolean
  folderId: number
  userId: string
  index: number
  memo: string
}
