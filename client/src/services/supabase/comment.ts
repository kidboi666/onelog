import { handleError } from '@/src/services/supabase/helpers'
import { SupabaseClient } from '@supabase/supabase-js'
import { createBrowserClient } from '@/src/lib/supabase/create-browser-client'
import { ICreateComment, IUpdateComment } from '@/src/types/dtos/comment'

export const createComment = async (
  params: ICreateComment,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase.from('comment').insert({
    user_id: params.userId,
    content: params.content,
    post_id: params.postId,
    comment_id: params.commentId || null,
  })

  handleError(error)
}

export const deleteComment = async (
  commentId: number,
  supabase: SupabaseClient = createBrowserClient(),
) => {
  const { error } = await supabase
    .from('comment')
    .delete()
    .eq('id', commentId)

  handleError(error)
}

export const updateComment = async (
  params: IUpdateComment,
  supabase: SupabaseClient = createBrowserClient(),
) => {
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
