'use client'

import { MouseEvent } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { meQuery } from '@/services/queries/auth/meQuery'
import useFavoriteSentence from '@/services/mutates/sentence/useFavoriteSentence'

import FavoriteButton from '@/app/(playground)/home/_components/FavoriteButton'
import CommentButton from '@/app/(playground)/home/_components/CommentButton'
import AccessTypeButtonWithDropDown from '@/app/(playground)/home/_components/AccessTypeButtonWithDropDown'
import ReportButton from '@/app/(playground)/home/_components/ReportButton'
import OptionButtonWithDropDown from '@/app/(playground)/home/_components/OptionButtonWithDropDown'
import { Container } from '@/components/shared/Container'
import { YStack } from '@/components/shared/Stack'
import Line from '@/components/shared/Line'

interface Props {
  params: { sentenceId: string }
}

export default function Default({ params }: Props) {
  const router = useRouter()
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, Number(params.sentenceId)),
  )
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: favoriteSentence } = useFavoriteSentence()
  const isOwner = me?.userId === sentence?.user_id

  const handleFavoriteSentence = (e: MouseEvent) => {
    e.stopPropagation()
    me
      ? favoriteSentence({
          meId: me.userId,
          sentenceId: Number(params.sentenceId),
        })
      : router.push('/auth_guard')
  }

  return (
    <Container className="sticky left-4 top-8 hidden h-fit rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray">
      <YStack as="nav" className="items-center">
        <FavoriteButton
          favoritedUserId={sentence?.favorited_user_id}
          favoritedCount={sentence?.favorite}
          onFavorite={handleFavoriteSentence}
          meId={me?.userId}
          viewToolTip
          isSide
        />
        <CommentButton
          commentCount={sentence?.comment}
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
        <ReportButton viewToolTip isSide />
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
