'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useMe } from '@/src/store/hooks/useMe'
import { postQuery } from '@/src/services/queries/post/post-query'
import Line from '@/src/components/Line'
import { XStack, YStack } from '@/src/components/Stack'
import AccessTypeButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AccessTypeButtonWithDropDown'
import CommentButton from '@/src/app/(playground)/(home)/_components/CommentButton'
import LikeButton from '@/src/app/(playground)/(home)/_components/LikeButton'
import OptionButtonWithDropDown from '@/src/app/(playground)/(home)/_components/OptionButtonWithDropDown'
import ReportButton from '@/src/app/(playground)/(home)/_components/ReportButton'
import ShareButton from '@/src/app/(playground)/(home)/_components/ShareButton'

interface Props {
  postId: number
}

export default function PostActionBar({ postId }: Props) {
  const { me } = useMe()
  const { data: post } = useSuspenseQuery(postQuery.getPost(postId, me?.id))

  if (!post) {
    return null
  }

  const { isLiked, likeCount, commentCount, accessType } = post

  return (
    <YStack className="sm:hidden">
      <Line />
      <XStack gap={0} className="items-center justify-between">
        <LikeButton
          isLike={isLiked.length >= 1}
          likeCount={likeCount[0].count}
          postId={postId}
          viewToolTip
        />
        <CommentButton viewToolTip commentCount={commentCount[0].count} />
        <AccessTypeButtonWithDropDown accessType={accessType} viewToolTip />
        <ShareButton viewToolTip />
        <ReportButton viewToolTip postId={postId} />
        <OptionButtonWithDropDown type="post" postId={post.id} />
      </XStack>
    </YStack>
  )
}
