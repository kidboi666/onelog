'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import SentenceItem from '@/components/feature/sentence/SentenceItem'

export default function SentenceSection() {
  const { data: sentences } = useSuspenseQuery(
    sentenceQuery.getAllSentence(supabase),
  )
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))

  return (
    <div className="flex flex-col gap-8">
      {sentences.map((sentence) => (
        <SentenceItem
          key={sentence.id}
          sentence={sentence}
          userId={me?.userId}
        />
      ))}
    </div>
  )
}
