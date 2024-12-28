'use client'

import CommentItem from './CommentItem'
import CommentInput from './CommentInput'
import { useSuspenseQuery } from '@tanstack/react-query'
import { commentQuery } from '@/src/services/queries/comment/comment-query'
import { supabase } from '@/src/lib/supabase/client'
import { List } from '@/src/components/List'
import Empty from '@/src/components/Empty'
import useMeQueries from '@/src/hooks/queries/useMeQueries'

interface Props {
  postId: number
}

export default function Comments({ postId }: Props) {
  const { me } = useMeQueries()
  const { data: comments } = useSuspenseQuery(
    commentQuery.getComment(supabase, postId),
  )
  return (
    <>
      <CommentInput postId={postId} me={me} />
      {comments.length === 0 ? (
        <Empty>
          <Empty.Text>아직 달린 댓글이 없습니다.</Empty.Text>
        </Empty>
      ) : (
        <List className="flex w-full flex-col gap-4">
          {comments.map((comment, idx) => (
            <CommentItem key={idx} comment={comment} postId={postId} me={me} />
          ))}
        </List>
      )}
    </>
  )
}
