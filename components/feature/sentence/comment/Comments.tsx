import Line from '@/components/shared/Line'
import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import { useSuspenseQuery } from '@tanstack/react-query'
import { commentQuery } from '@/services/queries/comment/commentQuery'
import { supabase } from '@/lib/supabase/client'
import { Suspense } from 'react'
import Spinner from '@/components/shared/Spinner'
import { Tables } from '@/types/supabase'

interface Props {
  sentenceId: number
  me: Tables<'user_info'>
}

export default function Comments({ sentenceId, me }: Props) {
  const { data: comments } = useSuspenseQuery(
    commentQuery.getComment(supabase, sentenceId),
  )
  return (
    <>
      <CommentInput sentenceId={sentenceId} />
      {comments.map((comment) => (
        <Suspense key={comment.id} fallback={<Spinner size={40} />}>
          <CommentItem comment={comment} sentenceId={sentenceId} me={me} />
        </Suspense>
      ))}
      <Line className="mb-8 mt-4" />
    </>
  )
}
