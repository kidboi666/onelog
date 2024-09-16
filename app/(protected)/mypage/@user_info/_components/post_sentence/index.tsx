'use client'

import { FormEvent, useState } from 'react'
import { useInput } from '@/hooks/useInput'
import { useSuspenseQuery } from '@tanstack/react-query'
import cn from '@/lib/cn'
import { meQuery } from '@/services/queries/auth/meQuery'
import { supabase } from '@/lib/supabase/client'

import useAddSentence from '@/services/mutates/sentence/useAddSentence'
import { EMOTION_STATUS } from '@/app/(protected)/(modals)/post/sentence/_constants'
import Text from '@/components/shared/Text'
import Box from '@/components/shared/Box'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import { List } from '@/components/shared/List'
import RefBox from '@/components/shared/RefBox'
import FormContainer from '@/components/shared/FormContainer'
import { useRouter } from 'next/navigation'

export default function PostSentence() {
  const [sentence, onChangeSentence, setSentence] = useInput('')
  const [selectedEmotion, setSelectedEmotion] = useState('')
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { mutate, isPending } = useAddSentence()
  const router = useRouter()

  const handleChangeEmotion = (emotion: string) => {
    setSelectedEmotion(emotion)
  }

  const handleSubmitSentence = (e: FormEvent) => {
    e.preventDefault()
    mutate(
      {
        content: sentence,
        emotion_level: selectedEmotion,
        user_id: me.userId,
        avatar_url: me.avatar_url,
        email: me.email,
        user_name: me.user_name,
      },
      {
        onSuccess: () => {
          setSentence('')
          setSelectedEmotion('')
          router.push('/success')
        },
      },
    )
  }

  return (
    <FormContainer
      onSubmit={handleSubmitSentence}
      className="flex flex-col gap-4 overflow-hidden"
    >
      <Box row className="w-full flex-1 gap-4">
        <Input
          value={sentence}
          variant="primary"
          placeholder="오늘 당신의 생각을 한 줄로 기록하세요."
          onChange={onChangeSentence}
          className="min-w-0 flex-1 p-2 text-sm"
        />
        <Button
          isLoading={isPending}
          disabled={!sentence || !selectedEmotion}
          type="submit"
          className="self-end text-nowrap"
        >
          등록하기
        </Button>
      </Box>
      <List className="relative flex items-start justify-between gap-2">
        <div className="absolute left-1/2 top-[7.5px] w-[calc(100%-30px)] -translate-x-1/2 border-b border-gray-300 dark:border-gray-500" />
        {EMOTION_STATUS.map((emotion) => (
          <EmotionSection
            key={emotion.status}
            emotion={emotion}
            selectedEmotion={selectedEmotion}
            onChangeEmotion={handleChangeEmotion}
          />
        ))}
      </List>
    </FormContainer>
  )
}

interface Props {
  emotion: (typeof EMOTION_STATUS)[number]
  onChangeEmotion: (emotion: string) => void
  selectedEmotion: string
}

function EmotionSection({ emotion, selectedEmotion, onChangeEmotion }: Props) {
  return (
    <List.Row
      onClick={() => onChangeEmotion(emotion.percent)}
      className="group relative flex size-10 cursor-pointer justify-center"
    >
      <Button
        variant="emptyStyle"
        size="sm"
        onClick={() => onChangeEmotion(emotion.percent)}
        className="absolute flex flex-col gap-2 font-medium text-gray-400 hover:opacity-100"
      >
        <Text type="caption" size="sm" className="absolute top-4">
          {emotion.status}
        </Text>
        <RefBox
          className={cn(
            'absolute top-1 size-2 rounded-full bg-gray-300 ring-1 ring-gray-300 transition group-hover:ring-4 dark:bg-var-darkgray dark:ring-gray-500',
            selectedEmotion === emotion.percent && 'bg-slate-700 ring-4',
          )}
        />
      </Button>
    </List.Row>
  )
}
