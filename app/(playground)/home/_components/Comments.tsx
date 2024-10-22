import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import { useSuspenseQuery } from '@tanstack/react-query'
import { commentQuery } from '@/services/queries/comment/commentQuery'
import { supabase } from '@/lib/supabase/client'
import { Suspense } from 'react'
import Spinner from '@/components/shared/Spinner'
import { Tables } from '@/types/supabase'
import { List } from '@/components/shared/List'
import Empty from '@/components/shared/Empty'

interface Props {
  sentenceId: number
  me: Tables<'user_info'> | null
}

export default function Comments({ sentenceId, me }: Props) {
  const { data: comments } = useSuspenseQuery(
    commentQuery.getComment(supabase, sentenceId),
  )
  return (
    <>
      <CommentInput sentenceId={sentenceId} me={me} />
      {comments.length === 0 ? (
        <Empty>아직 달린 댓글이 없습니다.</Empty>
      ) : (
        <List className="w-full overflow-y-auto">
          {comments.map((comment) => (
            <Suspense key={comment.id} fallback={<Spinner size={40} />}>
              <CommentItem comment={comment} sentenceId={sentenceId} me={me} />
            </Suspense>
          ))}
        </List>
      )}
    </>
  )
}
