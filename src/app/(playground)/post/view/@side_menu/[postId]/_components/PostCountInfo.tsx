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
    postQuery.getPost(supabase, postId, session?.userId),
  )

  const { like_count, is_liked, comment_count } = post

  return (
    <>
      <LikeButton
        likeCount={like_count[0].count}
        isLiked={is_liked.length > 0}
        postId={postId}
        viewToolTip
        isSide
      />
      <CommentButton commentCount={comment_count[0].count} viewToolTip isSide />
    </>
  )
}
