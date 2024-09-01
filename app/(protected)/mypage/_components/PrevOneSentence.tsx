'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { Tables } from '@/types/supabase'
import { createBrowserClient } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import Title from '@/components/shared/Title'
import ProfileSentenceItem from '@/components/sentence/ProfileSentenceItem'

export default function PrevOneSentence() {
  const supabase = createBrowserClient()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, me?.sub),
  )

  return (
    <div className="flex flex-col gap-4">
      <Title>그날의 한 문장</Title>
      <div className="flex flex-col">
        {sentence?.map((item: Tables<'sentence'>) => (
          <ProfileSentenceItem key={item.id} sentence={item} />
        ))}
      </div>
    </div>
  )
}
