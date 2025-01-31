import { handleError } from '@/src/adapters/query-helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { ICreateComment, IUpdateComment } from '@/src/types/dtos/comment'
import { ICommentBaseAdapter } from '@/src/types/services/index'

export const createSupabaseCommentAdapter = (
  supabase: SupabaseClient,
): ICommentBaseAdapter => {
  const createComment = async (params: ICreateComment) => {
    const { error } = await supabase.from('comment').insert({
      user_id: params.userId,
      content: params.content,
      post_id: params.postId,
      comment_id: params.commentId || null,
    })

    handleError(error)
  }

  const deleteComment = async (commentId: number) => {
    const { error } = await supabase
      .from('comment')
      .delete()
      .eq('id', commentId)

    handleError(error)
  }

  const updateComment = async (params: IUpdateComment) => {
    const { content, postId, commentId } = params

    let query = supabase
      .from('comment')
      .update({
        content,
      })
      .eq('post_id', postId)

    if (commentId) {
      query = query.eq('comment_id', commentId)
    }

    const { error } = await query

    handleError(error)
  }

  return {
    createComment,
    deleteComment,
    updateComment,
  }
}
