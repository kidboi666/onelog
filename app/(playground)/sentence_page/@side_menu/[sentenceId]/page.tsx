'use client'

import { MouseEvent } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { meQuery } from '@/services/queries/auth/meQuery'

import FavoriteButton from '@/app/(playground)/home/_components/FavoriteButton'
import CommentButton from '@/app/(playground)/home/_components/CommentButton'
import AccessTypeButtonWithDropDown from '@/app/(playground)/home/_components/AccessTypeButtonWithDropDown'
import ReportButton from '@/app/(playground)/home/_components/ReportButton'
import OptionButtonWithDropDown from '@/app/(playground)/home/_components/OptionButtonWithDropDown'
import { Container } from '@/components/shared/Container'
import { YStack } from '@/components/shared/Stack'
import Line from '@/components/shared/Line'
import useLikeSentence from '@/services/mutates/sentence/useLikeSentence'
import useUnlikeSentence from '@/services/mutates/sentence/useUnlikeSentence'
import { countCommentQuery } from '@/services/queries/comment/countCommentQuery'
import ShareButton from '@/app/(playground)/home/_components/ShareButton'

interface Props {
  params: { sentenceId: string }
}

export default function SideMenuPage({ params }: Props) {
  const sentenceId = Number(params.sentenceId)
  const router = useRouter()
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, Number(params.sentenceId)),
  )
  const { data: commentCount } = useSuspenseQuery(
    countCommentQuery.countCommentFromSentence(supabase, sentenceId),
  )
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: isLiked } = useSuspenseQuery(
    sentenceQuery.checkLiked(supabase, sentenceId, me?.userId),
  )
  const { mutate: like } = useLikeSentence()
  const { mutate: unlike } = useUnlikeSentence()
  const isOwner = me?.userId === sentence?.user_id

  const handleFavorite = () => {
    isLiked
      ? unlike({ meId: me?.userId, sentenceId })
      : like({
          meId: me?.userId,
          sentenceId: sentenceId,
        })
  }

  const handleFavoriteSentence = (e: MouseEvent) => {
    e.stopPropagation()
    me ? handleFavorite() : router.push('/modal/auth_guard', { scroll: false })
  }

  return (
    <Container className="sticky left-4 top-8 hidden h-fit animate-fade-in-reverse rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray">
      <YStack as="nav" className="items-center">
        <FavoriteButton
          favoritedCount={sentence?.like[0].count}
          isLiked={isLiked}
          onFavorite={handleFavoriteSentence}
          meId={me?.userId}
          viewToolTip
          isSide
        />
        <CommentButton
          commentCount={commentCount}
          showComment={!!sentence?.comment}
          viewToolTip
          isSide
        />
        <Line className="w-full" />
        <AccessTypeButtonWithDropDown
          accessType={sentence?.access_type}
          viewToolTip
          isSide
        />
        <ShareButton isSide viewToolTip />
        <ReportButton sentenceId={sentence.id} viewToolTip isSide />
        {isOwner && (
          <OptionButtonWithDropDown
            isOwner={isOwner}
            sentenceId={sentence?.id}
            isSide
          />
        )}
      </YStack>
    </Container>
  )
}
