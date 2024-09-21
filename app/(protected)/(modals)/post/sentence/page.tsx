'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useInput } from '@/hooks/useInput'
import { EMOTION_STATUS } from './_constants'
import useAddSentence from '@/services/mutates/sentence/useAddSentence'

import Modal from '@/components/shared/Modal'
import Input from '@/components/shared/Input'
import Button from '@/components/shared/Button'
import { List } from '@/components/shared/List'
import EmotionPicker from '@/components/feature/sentence/EmotionPicker'

export default function SentenceModal() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [sentence, onChangeSentence, setSentence] = useInput('')
  const [selectedEmotion, setSelectedEmotion] = useState('')
  const { mutate: addSentence, isPending } = useAddSentence()
  const router = useRouter()

  const handleChangeEmotion = (emotion: string) => {
    setSelectedEmotion(emotion)
  }

  const handleSubmitSentence = (e: FormEvent) => {
    e.preventDefault()
    addSentence(
      {
        content: sentence,
        emotion_level: selectedEmotion,
        user_id: me.userId,
        user_name: me.user_name,
        email: me.email,
        avatar_url: me.avatar_url,
      },
      {
        onSuccess: () => {
          setSentence('')
          setSelectedEmotion('')
          router.push('/success')
          router.back()
        },
      },
    )
  }

  return (
    <Modal className="">
      <form onSubmit={handleSubmitSentence} className="size-full">
        <div className="flex w-full flex-col gap-4">
          <div className="flex gap-4 rounded-md bg-var-lightgray px-2 py-4 dark:bg-var-darkgray">
            <Input
              value={sentence}
              placeholder="오늘 당신의 생각을 한 줄로 기록하세요."
              onChange={onChangeSentence}
              className="w-full p-2 text-sm dark:bg-var-dark"
            />
            <Button
              isLoading={isPending}
              disabled={!sentence || !selectedEmotion}
              type="submit"
              size="md"
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
    </Modal>
  )
}
