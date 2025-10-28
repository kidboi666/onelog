'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useMe } from '@/src/store/hooks/useMe'
import { postQuery } from '@/src/services/queries/post/post-query'
import CommentButton from '@/src/app/(playground)/(home)/_components/CommentButton'
import LikeButton from '@/src/app/(playground)/(home)/_components/LikeButton'

interface Props {
  postId: number
}

export default function PostCountInfo({ postId }: Props) {
  const { me } = useMe()
  const { data: post } = useSuspenseQuery(postQuery.getPost(postId, me?.id))

  if (!post) {
    return null
  }

  const { likeCount, isLiked, commentCount } = post

  return (
    <>
      <LikeButton
        likeCount={likeCount[0].count}
        isLike={isLiked.length > 0}
        postId={postId}
        viewToolTip
        isSide
      />
      <CommentButton commentCount={commentCount[0].count} viewToolTip isSide />
    </>
  )
}
