import Line from '@/components/shared/Line'
import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import { useSuspenseQuery } from '@tanstack/react-query'
import { commentQuery } from '@/services/queries/comment/commentQuery'
import { supabase } from '@/lib/supabase/client'

interface Props {
  sentenceId: number
}

export default function CommentContainer({ sentenceId }: Props) {
  const { data: comments } = useSuspenseQuery(
    commentQuery.getComment(supabase, sentenceId),
  )
  return (
    <>
      <CommentInput sentenceId={sentenceId} />
      {comments.map((comment) => (
        <CommentItem comment={comment} />
      ))}
      <Line className="mb-8 mt-4" />
    </>
  )
}
