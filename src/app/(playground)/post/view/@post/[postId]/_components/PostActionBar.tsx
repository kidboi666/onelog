'use client'

import Line from '@/src/components/shared/Line'
import { XStack, YStack } from '@/src/components/shared/Stack'
import LikeButton from '@/src/app/(playground)/(home)/_components/LikeButton'
import ShareButton from '@/src/app/(playground)/(home)/_components/ShareButton'
import ReportButton from '@/src/app/(playground)/(home)/_components/ReportButton'
import OptionButtonWithDropDown from '@/src/app/(playground)/(home)/_components/OptionButtonWithDropDown'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'
import CommentButton from '@/src/app/(playground)/(home)/_components/CommentButton'
import AccessTypeButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AccessTypeButtonWithDropDown'

interface Props {
  postId: number
}

export default function PostActionBar({ postId }: Props) {
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId))

  return (
    <YStack className="sm:hidden">
      <Line />
      <XStack gap={0} className="items-center justify-between">
        <LikeButton
          likeCount={post?.like[0].count}
          postId={postId}
          viewToolTip
        />
        <CommentButton viewToolTip commentCount={post.comment[0].count} />
        <AccessTypeButtonWithDropDown
          accessType={post?.access_type}
          viewToolTip
        />
        <ShareButton viewToolTip />
        <ReportButton viewToolTip postId={postId} />
        <OptionButtonWithDropDown postId={post.id} />
      </XStack>
    </YStack>
  )
}
