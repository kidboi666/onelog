import { PostType } from '@/src/types/enums/index'

export interface ILike {
  postId?: number
  meId?: string | null
  postType?: PostType
  authorId?: string | null
  startOfDay?: string | null
  isLike: boolean
  endOfDay?: string | null
}
