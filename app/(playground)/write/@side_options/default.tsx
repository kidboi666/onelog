'use client'

import { MouseEvent, useEffect, useState } from 'react'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useSuspenseQuery } from '@tanstack/react-query'

import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import { meQuery } from '@/services/queries/auth/meQuery'

import AccessTypeButtonWithDropDown from '@/app/(playground)/home/_components/AccessTypeButtonWithDropDown'
import OptionButtonWithDropDown from '@/app/(playground)/home/_components/OptionButtonWithDropDown'
import { Container } from '@/components/shared/Container'
import { YStack } from '@/components/shared/Stack'
import Line from '@/components/shared/Line'
import PublishSection from '../@write_section/_components/PublishSection'
import PostTypeSection from '../@write_section/_components/PostTypeSection'
import EmotionSection from '../@write_section/_components/EmotionSection'
import {
  TAccess,
  TEmotion,
  TPost,
} from '../@write_section/_containers/PostContainer'

interface Props {
  params: { sentenceId: string }
}

export default function Default({ params }: Props) {
  const sentenceId = Number(params.sentenceId)
  const router = useRouter()
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, Number(params.sentenceId)),
  )
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  const [selectedEmotion, setSelectedEmotion] = useState<TEmotion | null>('50%')
  const [accessType, setAccessType] = useState<TAccess>('public')
  const [postType, setPostType] = useState<TPost>('journal')

  const isOwner = me?.userId === sentence?.user_id
  const handleChangeEmotion = (emotion: TEmotion | null) =>
    setSelectedEmotion(emotion)
  const handleChangeAccessType = (order: TAccess) => setAccessType(order)
  const handleChangePostType = (order: TPost) => setPostType(order)

  useEffect(() => {
    postType === 'article'
      ? handleChangeEmotion(null)
      : handleChangeEmotion('50%')
  }, [postType])

  return (
    <Container className="sticky left-4 top-8 hidden h-fit animate-fade-in-reverse rounded-md bg-white p-2 shadow-md max-lg:fixed sm:flex dark:bg-var-darkgray">
      <YStack as="nav" className="items-center">
        <PublishSection
          accessType={accessType}
          onChangeAccessType={handleChangeAccessType}
          isSide
        />
        <PostTypeSection
          postType={postType}
          onChangePostType={handleChangePostType}
          isSide
        />
        <Line className="w-full" />
        <EmotionSection
          selectedEmotion={selectedEmotion}
          onChangeEmotion={handleChangeEmotion}
          isSide
        />
      </YStack>
    </Container>
  )
}
