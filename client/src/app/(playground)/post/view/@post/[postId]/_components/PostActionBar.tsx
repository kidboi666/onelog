'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/create-browser-client'
import { meQuery } from '@/src/services/queries/auth/me-query'
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
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: post } = useSuspenseQuery(
    postQuery.getPost(supabase, postId, session?.id),
  )

  if (!post) {
    return null
  }

  const { isLiked, likeCount, commentCount, accessType } = post

  return (
    <YStack className="sm:hidden">
      <Line />
      <XStack gap={0} className="items-center justify-between">
        <LikeButton
          isLiked={isLiked.length >= 1}
          likeCount={likeCount[0].count}
          postId={postId}
          viewToolTip
        />
        <CommentButton viewToolTip commentCount={commentCount[0].count} />
        <AccessTypeButtonWithDropDown accessType={accessType} viewToolTip />
        <ShareButton viewToolTip />
        <ReportButton viewToolTip postId={postId} />
        <OptionButtonWithDropDown postId={post?.id} />
      </XStack>
    </YStack>
  )
}
