import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import { useSuspenseQuery } from '@tanstack/react-query'
import { commentQuery } from '@/services/queries/comment/commentQuery'
import { supabase } from '@/lib/supabase/client'
import { Suspense } from 'react'
import Spinner from '@/components/shared/Spinner'
import { List } from '@/components/shared/List'
import Empty from '@/components/shared/Empty'
import { IUserSession } from '@/services/queries/auth/meQuery'

interface Props {
  sentenceId: number
  me: IUserSession | null
}

export default function Comments({ sentenceId, me }: Props) {
  const { data: comments } = useSuspenseQuery(
    commentQuery.getComment(supabase, sentenceId),
  )
  return (
    <>
      <CommentInput sentenceId={sentenceId} me={me} />
      {comments.length === 0 ? (
        <Empty>
          <Empty.Text>아직 달린 댓글이 없습니다.</Empty.Text>
        </Empty>
      ) : (
        <List className="flex w-full flex-col gap-4">
          {comments.map((comment, idx) => (
            <Suspense key={comment.id} fallback={<Spinner size={40} />}>
              <CommentItem
                comment={comment}
                sentenceId={sentenceId}
                me={me}
                isLastComment={comments.length === idx + 1}
              />
            </Suspense>
          ))}
        </List>
      )}
    </>
  )
}
