'use client'

import { FormEvent, useState } from 'react'
import { useInput } from '@/hooks/useInput'
import { useSuspenseQuery } from '@tanstack/react-query'
import { meQuery } from '@/services/queries/auth/meQuery'
import { supabase } from '@/lib/supabase/client'

import useAddSentence from '@/services/mutates/sentence/useAddSentence'
import { EMOTION_STATUS } from '@/app/(protected)/(modals)/post/sentence/_constants'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import { List } from '@/components/shared/List'
import { useRouter } from 'next/navigation'
import Avatar from '@/components/feature/user/Avatar'
import EmotionPicker from '@/components/feature/sentence/EmotionPicker'
import cn from '@/lib/cn'

export default function PostSentence() {
  const [isFocus, setFocus] = useState(false)
  const [sentence, onChangeSentence, setSentence] = useInput('')
  const [selectedEmotion, setSelectedEmotion] = useState('')
  const { data } = useSuspenseQuery(meQuery.getUserSession(supabase))
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
        user_id: data.userId,
        user_name: data.user_name,
        email: data.email,
        avatar_url: data.avatar_url,
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
    <form onSubmit={handleSubmitSentence} className="flex gap-2">
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-4">
          <Avatar
            src={data?.avatar_url}
            size="sm"
            shadow="sm"
            className="max-sm:hidden"
          />
          <Input
            onFocus={() => setFocus(true)}
            onBlur={() => setFocus(false)}
            value={sentence}
            variant="primary"
            placeholder="오늘 당신의 생각을 한 줄로 기록하세요."
            onChange={onChangeSentence}
            className={cn(
              'w-full min-w-0 p-2 text-sm',
              isFocus ? 'ring-4' : 'animate-cta-fadein-out',
            )}
          />
          <Button
            isLoading={isPending}
            disabled={!sentence || !selectedEmotion}
            type="submit"
            className="self-end text-nowrap"
          >
            등록하기
          </Button>
        </div>
        <List className="relative flex items-start justify-between gap-2">
          <div className="absolute left-1/2 top-[7.5px] w-[calc(100%-30px)] -translate-x-1/2 border-b border-zinc-200 dark:border-zinc-600" />
          {EMOTION_STATUS.map((emotion) => (
            <EmotionPicker
              key={emotion.status}
              emotion={emotion}
              selectedEmotion={selectedEmotion}
              onChangeEmotion={handleChangeEmotion}
            />
          ))}
        </List>
      </div>
    </form>
  )
}
