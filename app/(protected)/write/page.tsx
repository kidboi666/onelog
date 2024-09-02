'use client'

import { FormEvent, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { createBrowserClient } from '@/lib/supabase/client'
import { useModal } from '@/store/useModal'
import { meQuery } from '@/services/queries/auth/meQuery'
import useAddSentence from '@/services/mutates/sentence/useAddSentence'
import { useInput } from '@/hooks/useInput'
import { formatDateToYMD } from '@/utils/formatDate'

import Title from '@/components/shared/Title'
import { INIT_STATUS, WEEKDAY } from './_constants'
import EmotionSection from './_components/EmotionSection'
import SentenceSection from './_components/SentenceSection'

export default function WritePage() {
  const supabase = createBrowserClient()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: addSentence, isPending } = useAddSentence()
  const [sentence, onChangeSentence, setSentence] = useInput('')
  const { openModal } = useModal()
  const [selectedStatus, setSelectedStatus] = useState(INIT_STATUS)

  const handleStatusClick = (status: typeof INIT_STATUS) => {
    setSelectedStatus({ percent: status.percent, color: status.color })
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    addSentence(
      {
        content: sentence,
        emotion_level: selectedStatus.percent,
        user_id: me?.sub,
      },
      {
        onSuccess: () => {
          openModal('success', {
            onSubmit: () => {
              setSentence('')
              setSelectedStatus(INIT_STATUS)
            },
          })
        },
      },
    )
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-20 flex w-full flex-col items-center justify-between gap-20 md:px-12 xl:max-w-[768px]"
    >
      <div className="relative">
        <Title>
          {`${formatDateToYMD(new Date().toString())}(${WEEKDAY[new Date().getDay()]}) 기록`}
        </Title>
      </div>
      <div className="flex flex-col items-center gap-8">
        <EmotionSection
          selectedStatus={selectedStatus}
          onStatusClick={handleStatusClick}
        />
      </div>
      <div className="flex w-[400px] flex-col items-center gap-8">
        <SentenceSection
          onChangeSentence={onChangeSentence}
          selectedStatusPercent={selectedStatus.percent}
          sentence={sentence}
          isPending={isPending}
        />
      </div>
    </form>
  )
}
