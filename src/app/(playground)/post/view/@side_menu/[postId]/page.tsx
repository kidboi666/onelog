'use client'

import { MouseEvent } from 'react'
import { supabase } from '@/src/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { postQuery } from '@/src/services/queries/post/post-query'

import { Container } from '@/src/components/shared/Container'
import { YStack } from '@/src/components/shared/Stack'
import Line from '@/src/components/shared/Line'
import { routes } from '@/src/routes'
import LikeButton from '@/src/app/(playground)/(home)/_components/LikeButton'
import CommentButton from '@/src/app/(playground)/(home)/_components/CommentButton'
import AccessTypeButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AccessTypeButtonWithDropDown'
import ShareButton from '@/src/app/(playground)/(home)/_components/ShareButton'
import ReportButton from '@/src/app/(playground)/(home)/_components/ReportButton'
import OptionButtonWithDropDown from '@/src/app/(playground)/(home)/_components/OptionButtonWithDropDown'
import { countCommentQuery } from '@/src/services/queries/comment/count-comment-query'
import useLikeActions from '@/src/hooks/actions/useLikeActions'
import useMe from '@/src/hooks/useMe'

interface Props {
  params: { postId: string }
}

export default function SideMenuPage({ params }: Props) {
  const postId = Number(params.postId)
  const router = useRouter()
  const { data: post } = useSuspenseQuery(
    postQuery.getPost(supabase, Number(params.postId)),
  )
  const { data: commentCount } = useSuspenseQuery(
    countCommentQuery.countCommentFromPost(supabase, postId),
  )
  const { me } = useMe()
  const { isLike, onLikePost } = useLikeActions({ me, postId })
  const isOwner = me?.id === post?.user_id

  const handleFavoritePost = (e: MouseEvent): void => {
    e.stopPropagation()
    me ? onLikePost(e) : router.push(routes.modal.auth.guard, { scroll: false })
  }

  return (
    <Container className="sticky left-4 top-8 hidden h-fit animate-fade-in-reverse rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray">
      <YStack as="nav" className="items-center">
        <LikeButton
          likedCount={post?.like[0].count}
          isLike={isLike}
          onLike={handleFavoritePost}
          meId={me?.id}
          viewToolTip
          isSide
        />
        <CommentButton commentCount={commentCount} viewToolTip isSide />
        <Line className="w-full" />
        <AccessTypeButtonWithDropDown
          accessType={post?.access_type}
          viewToolTip
          isSide
        />
        <ShareButton isSide viewToolTip />
        <ReportButton postId={post.id} viewToolTip isSide />
        {isOwner && (
          <OptionButtonWithDropDown
            isOwner={isOwner}
            postId={post?.id}
            isSide
          />
        )}
      </YStack>
    </Container>
  )
}
