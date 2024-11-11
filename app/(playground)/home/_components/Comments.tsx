import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import { useSuspenseQuery } from '@tanstack/react-query'
import { commentQuery } from '@/services/queries/comment/commentQuery'
import { supabase } from '@/lib/supabase/client'
import { List } from '@/components/shared/List'
import Empty from '@/components/shared/Empty'
import { IUserInfoWithMBTI } from '@/types/auth'

interface Props {
  sentenceId: number
  me?: IUserInfoWithMBTI
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
            <CommentItem
              key={idx}
              comment={comment}
              sentenceId={sentenceId}
              me={me}
              isLastComment={comments.length === idx + 1}
            />
          ))}
        </List>
      )}
    </>
  )
}
