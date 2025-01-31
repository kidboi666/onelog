'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useMemo } from 'react'
import { useMe } from '@/src/store/hooks/useMe'
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
  const { me } = useMe()
  const { data: post } = useSuspenseQuery(postQuery.getPost(postId, me?.id))
  const comments = useMemo(() => {
    if (!post || post.comments.length === 0) {
      return []
    }
    return sortByDate(post.comments)
  }, [post])

  return (
    <>
      <CommentInput postId={postId} me={me} />
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
                me={me}
              />
            )
          })}
        </List>
      )}
    </>
  )
}
