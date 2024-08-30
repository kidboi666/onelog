'use client'

import { createBrowserClient } from '@/lib/supabase/client'
import { useEffect, useState } from 'react'
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

const EMOTION_STATUS = [
  { percent: '0%', color: 'bg-white' },
  { percent: '25%', color: 'bg-blue-50' },
  { percent: '50%', color: 'bg-blue-100' },
  { percent: '75%', color: 'bg-blue-200' },
  { percent: '100%', color: 'bg-blue-300' },
]

export const INIT_STATUS = { percent: '', color: '' }

export default function WritePage() {
  const supabase = createBrowserClient()
  const { data: me } = useSuspenseQuery(meQuery.getUserInfo(supabase))
  const { mutate: addSentence, isPending, isSuccess } = useAddSentence()
  const [sentence, onChangeSentence] = useInput('')
  const { openModal } = useModal()
  const [isReadyToSubmit, setReadyToSubmit] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState(INIT_STATUS)

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

  useEffect(() => {
    if (isReadyToSubmit) {
      handleSubmit()
    }
  }, [isReadyToSubmit])

  return (
    <div
      onKeyDown={(e) =>
        e.key === 'Enter' &&
        openModal('confirmation', {
          sentence,
          isPending,
          isSuccess,
          onSubmit: () => handleSubmit(),
        })
      }
      className="mt-20 flex flex-col items-center justify-between gap-20 px-12"
    >
      <div className="relative">
        <Title>2024.08.28(목)의 기록</Title>
        <div className="absolute bottom-0 h-2 w-full bg-blue-200/70" />
      </div>
      <div className="flex flex-col items-center gap-4">
        <Title>오늘의 기분 농도를 선택하세요.</Title>
        <div className="flex items-center gap-2">
          <Text>Good</Text>
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
          <Text>Bad</Text>
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-4">
        <Title>오늘을 한 줄로 기억해보세요.</Title>
        <Input
          onChange={onChangeSentence}
          className="w-full rounded-md p-4 ring-1 ring-blue-200"
        />
        <Button
          onClick={(e) =>
            openModal('confirmation', {
              sentence,
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
