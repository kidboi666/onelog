import { ICreateComment, IUpdateComment } from '@/src/types/dtos/comment'
import { ICommentBaseAdapter } from '@/src/types/services/index'

export const createNestCommentAdapter = (): ICommentBaseAdapter => {
  const createComment = async (params: ICreateComment) => {
    return Promise.resolve(undefined)
  }
  const deleteComment = async (commentId: number) => {
    return Promise.resolve(undefined)
  }
  const updateComment = async (params: IUpdateComment) => {
    return Promise.resolve(undefined)
  }
  return { createComment, deleteComment, updateComment }
}
