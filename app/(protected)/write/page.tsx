'use client'

import { createBrowserClient } from '@/lib/supabase/client'
import { useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/meQuery'
import useAddSentence from '@/services/mutates/sentence/useAddSentence'
import { useInput } from '@/hooks/useInput'
import Text from '@/components/shared/Text'
import Input from '@/components/shared/Input'
import Button from '@/components/shared/Button'
import Title from '@/components/shared/Title'
import EmotionBlock from './_components/EmotionBlock'
import { useModal } from '@/store/useModal'

import { INIT_STATUS, EMOTION_STATUS } from './_constants'
import useStateChange from '@/hooks/useStateChange'

export default function WritePage() {
  const supabase = createBrowserClient()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate: addSentence, isPending, isSuccess } = useAddSentence()
  const [sentence, onChangeSentence] = useInput('')
  const { openModal } = useModal()
  const [selectedStatus, setSelectedStatus] = useState(INIT_STATUS)
  const [ref, open, close] = useStateChange<HTMLDivElement>()

  const handleStatusClick = (status: typeof INIT_STATUS) => {
    setSelectedStatus({ percent: status.percent, color: status.color })
  }

  const handleSubmit = () => {
    addSentence(
      {
        content: sentence,
        emotion_level: selectedStatus.percent,
        user_id: me?.sub,
      },
      {
        onSuccess: () => {
          openModal('success')
        },
      },
    )
  }

  return (
    <div
      onKeyDown={(e) =>
        e.key === 'Enter' &&
        openModal('confirmation', {
          sentence,
          emotionLevel: selectedStatus,
          isPending,
          isSuccess,
          onSubmit: () => handleSubmit(),
        })
      }
      className="mt-20 flex w-full flex-col items-center justify-between gap-20 md:px-12 xl:max-w-[768px]"
    >
      <div className="relative">
        <Title>2024.08.28(목)의 기록</Title>
      </div>
      <div className="flex flex-col gap-8">
        <Title>오늘의 기분 농도를 선택하세요.</Title>
        <div className="flex gap-2">
          <Text>Bad</Text>
          {EMOTION_STATUS.map((emotion) => (
            <div
              key={emotion.percent}
              className="relative flex flex-col items-center gap-2"
            >
              <EmotionBlock
                state={emotion}
                currentState={selectedStatus}
                onClick={() => handleStatusClick(emotion)}
                className={emotion.color}
              />
              <Text size="sm" className="absolute top-[calc(100%--4px)]">
                {emotion.percent}
              </Text>
            </div>
          ))}
          <Text>Good</Text>
        </div>
      </div>

      <div className="flex flex-col gap-8">
        <Title>오늘을 한 줄로 기억해보세요.</Title>
        <div className="flex flex-col">
          <Input
            onFocus={open}
            onBlur={close}
            onChange={onChangeSentence}
            variant="secondary"
            className="py-2"
          />
          <div
            ref={ref}
            data-status="closed"
            className="status-line data-line"
          />
        </div>
        <Button
          onClick={(e) =>
            openModal('confirmation', {
              sentence,
              emotionLevel: selectedStatus,
              isPending,
              isSuccess,
              onSubmit: () => handleSubmit(),
            })
          }
          disabled={!sentence || !selectedStatus.percent}
        >
          한줄 남기기
        </Button>
      </div>
    </div>
  )
}
