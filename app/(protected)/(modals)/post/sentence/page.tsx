'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { formatDateToYMD } from '@/utils/formatDate'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useInput } from '@/hooks/useInput'
import { EMOTION_STATUS, INIT_STATUS, WEEKDAY } from './_constants'
import useAddSentence from '@/services/mutates/sentence/useAddSentence'

import Title from '@/components/shared/Title'
import Modal from '@/components/shared/Modal'
import Box from '@/components/shared/Box'
import FormContainer from '@/components/shared/FormContainer'
import EmotionSection from './_components/EmotionSection'
import SentenceSection from './_components/SentenceSection'
import Avatar from '@/components/feature/user/Avatar'
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

  // const handleSubmit = (e: FormEvent) => {
  //   e.preventDefault()
  //   addSentence(
  //     {
  //       content: sentence,
  //       emotion_level: selectedEmotion.percent,
  //       user_id: me?.userId,
  //       avatar_url: me?.avatar_url,
  //       email: me?.email,
  //       user_name: me?.user_name,
  //     },
  //     {
  //       onSuccess: () => {
  //         router.push('/success')
  //         setSentence('')
  //         setSelectedStatus(INIT_STATUS)
  //       },
  //     },
  //   )
  // }

  return (
    <Modal className="bg-var-lightgray">
      <FormContainer className="size-full">
        <Box col className="w-full flex-1 gap-4">
          <Box row className="gap-4 rounded-md bg-var-lightgray px-2 py-4">
            <Input
              value={sentence}
              variant="primary"
              placeholder="오늘 당신의 생각을 한 줄로 기록하세요."
              onChange={onChangeSentence}
              className="flex-1 p-2 text-sm"
            />
            <Button
              isLoading={isPending}
              disabled={!sentence || !selectedEmotion}
              type="submit"
              className="self-end"
            >
              등록하기
            </Button>
          </Box>
          <List className="relative flex items-start justify-between gap-2">
            <div className="absolute left-1/2 top-[7.5px] w-[calc(100%-30px)] -translate-x-1/2 border-b border-gray-300 dark:border-gray-500" />
            {EMOTION_STATUS.map((emotion) => (
              <EmotionPicker
                key={emotion.status}
                emotion={emotion}
                selectedEmotion={selectedEmotion}
                onChangeEmotion={handleChangeEmotion}
              />
            ))}
          </List>
        </Box>
        {/* <Box className="flex w-full flex-col items-center gap-20">
          <EmotionSection
            selectedStatus={selectedStatus}
            onStatusClick={handleStatusClick}
          />
          <SentenceSection
            onChangeSentence={onChangeSentence}
            selectedStatusPercent={selectedStatus.percent}
            sentence={sentence}
            isPending={isPending}
          />
        </Box> */}
      </FormContainer>
    </Modal>
  )
}
