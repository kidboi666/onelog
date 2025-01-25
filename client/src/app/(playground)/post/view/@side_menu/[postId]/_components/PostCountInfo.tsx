'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import CommentButton from '@/src/app/(playground)/(home)/_components/CommentButton'
import LikeButton from '@/src/app/(playground)/(home)/_components/LikeButton'

interface Props {
  postId: number
}

export default function PostCountInfo({ postId }: Props) {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: post } = useSuspenseQuery(
    postQuery.getPost(supabase, postId, session?.id),
  )

  if (!post) {
    return null
  }

  const { likeCount, isLiked, commentCount } = post

  return (
    <>
      <LikeButton
        likeCount={likeCount[0].count}
        isLiked={isLiked.length > 0}
        postId={postId}
        viewToolTip
        isSide
      />
      <CommentButton commentCount={commentCount[0].count} viewToolTip isSide />
    </>
  )
}
