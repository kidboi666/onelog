'use client'

import { useSuspenseQuery } from '@tanstack/react-query'

import { supabase } from '@/src/lib/supabase/client'

import { meQuery } from '@/src/services/queries/auth/me-query'
import { postQuery } from '@/src/services/queries/post/post-query'

import Empty from '@/src/components/Empty'
import { List } from '@/src/components/List'

import CommentInput from './CommentInput'
import CommentItem from './CommentItem'

interface Props {
  postId: number
}

export default function Comments({ postId }: Props) {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId))

  const comments = post.comments.sort(
    (a, b) => Number(new Date(a.created_at)) - Number(new Date(b.created_at)),
  )

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
            if (comment.comment_id) return null

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
