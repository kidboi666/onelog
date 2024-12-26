'use client'

import Line from '@/src/components/shared/Line'
import { XStack, YStack } from '@/src/components/shared/Stack'
import LikeButton from '@/src/app/(playground)/(home)/_components/LikeButton'
import CommentButton from '@/src/app/(playground)/(home)/_components/CommentButton'
import AccessTypeButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AccessTypeButtonWithDropDown'
import ShareButton from '@/src/app/(playground)/(home)/_components/ShareButton'
import ReportButton from '@/src/app/(playground)/(home)/_components/ReportButton'
import OptionButtonWithDropDown from '@/src/app/(playground)/(home)/_components/OptionButtonWithDropDown'
import useLikeActions from '@/src/hooks/actions/useLikeActions'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'
import useMe from '@/src/hooks/useMe'

interface Props {
  postId: number
}

export default function PostActionBar({ postId }: Props) {
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId))
  const { me } = useMe()
  const { isLike, onLikePost } = useLikeActions({ postId, me })
  const isOwner = me?.id === post?.user_id

  return (
    <YStack className="sm:hidden">
      <Line />
      <XStack gap={0} className="items-center justify-between">
        <LikeButton
          isLike={isLike}
          likedCount={post?.like[0].count}
          onLike={onLikePost}
          meId={me?.id}
          viewToolTip
        />
        <CommentButton viewToolTip commentCount={post.comment} />
        <AccessTypeButtonWithDropDown
          accessType={post?.access_type}
          viewToolTip
        />
        <ShareButton viewToolTip />
        <ReportButton viewToolTip postId={postId} />
        {isOwner && (
          <OptionButtonWithDropDown isOwner={isOwner} postId={post.id} />
        )}
      </XStack>
    </YStack>
  )
}
