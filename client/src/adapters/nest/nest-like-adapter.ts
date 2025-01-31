import { ILike } from '@/src/types/entities/like'
import { ILikeBaseAdapter } from '@/src/types/services/index'

export const createNestLikeAdapter = (): ILikeBaseAdapter => {
  const handleLike = async (params: ILike) => {
    return Promise.resolve(undefined)
  }

  return {
    handleLike,
  }
}
