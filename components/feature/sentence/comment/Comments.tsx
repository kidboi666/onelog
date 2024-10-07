import Line from '@/components/shared/Line'
import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import { useSuspenseQuery } from '@tanstack/react-query'
import { commentQuery } from '@/services/queries/comment/commentQuery'
import { supabase } from '@/lib/supabase/client'
import { Suspense } from 'react'
import Spinner from '@/components/shared/Spinner'
import { Tables } from '@/types/supabase'
import { List } from '@/components/shared/List'

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
      <List className="w-full overflow-y-auto">
        {comments.map((comment) => (
          <Suspense key={comment.id} fallback={<Spinner size={40} />}>
            <CommentItem comment={comment} sentenceId={sentenceId} me={me} />
          </Suspense>
        ))}
      </List>
      <Line className="mb-8 mt-4" />
    </>
  )
}
