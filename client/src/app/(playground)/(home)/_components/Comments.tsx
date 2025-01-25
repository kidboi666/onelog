'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { supabase } from '@/src/lib/supabase/client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { sortByDate } from '@/src/utils/client-utils'
import Empty from '@/src/components/Empty'
import { List } from '@/src/components/List'
import CommentInput from './CommentInput'
import CommentItem from './CommentItem'

interface Props {
  postId: number
}

export default function Comments({ postId }: Props) {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: post } = useSuspenseQuery(
    postQuery.getPost(supabase, postId, session?.id),
  )
  const comments = useMemo(() => {
    if (!post || post.comments.length === 0) {
      return []
    }
    return sortByDate(post.comments)
  }, [post])

  return (
    <>
      <CommentInput postId={postId} session={session} />
      {comments.length === 0 ? (
        <Empty>
          <Empty.Text>아직 달린 댓글이 없습니다.</Empty.Text>
        </Empty>
      ) : (
        <List className="flex w-full flex-col gap-4">
          {comments.map((comment, idx) => {
            if (comment.commentId) return null

            return (
              <CommentItem
                key={idx}
                comment={comment}
                postId={postId}
                session={session}
              />
            )
          })}
        </List>
      )}
    </>
  )
}
