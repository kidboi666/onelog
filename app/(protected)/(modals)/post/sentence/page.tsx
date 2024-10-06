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
import Button from '@/components/shared/Button'
import { List } from '@/components/shared/List'
import EmotionPicker from '@/components/feature/sentence/EmotionPicker'
import { BubbleMenu, EditorContent } from '@tiptap/react'
import { TagsInput } from '@/components/shared/TagsInput'
import useBlockEditor from '@/hooks/useBlockEditor'
import MenuBar from '@/components/feature/text_editor/MenuBar'
import BubbleMenuBar from '@/components/feature/text_editor/BubbleMenuBar'
import TextLength from '@/components/feature/text_editor/TextLength'

export default function SentenceModal() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [content, _, setContent] = useInput<string>('')
  const [selectedEmotion, setSelectedEmotion] = useState('')
  const { editor } = useBlockEditor({
    setContent,
    content,
    editable: true,
    placeholder: '오늘 당신의 생각을 한 줄로 기록하세요.',
  })
  const [tags, setTags] = useState<string[]>([])
  const { mutate: addSentence, isPending } = useAddSentence()
  const router = useRouter()

  if (!editor) return null

  const handleChangeEmotion = (emotion: string) => {
    setSelectedEmotion(emotion)
  }

  const handleSubmitSentence = (e: FormEvent) => {
    e.preventDefault()

    if (editor.getText().length >= 300) {
      return null
    }

    addSentence(
      {
        content,
        emotion_level: selectedEmotion,
        user_id: me.userId,
        user_name: me.user_name,
        email: me.email,
        avatar_url: me.avatar_url,
        tags,
      },
      {
        onSuccess: () => {
          setContent('')
          setSelectedEmotion('')
          router.push('/success')
          router.back()
        },
      },
    )
  }

  return (
    <Modal className="top-10 -translate-y-0 bg-white">
      <form onSubmit={handleSubmitSentence} className="size-full">
        <div className="flex max-h-[600px] w-full flex-col gap-4">
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <BubbleMenuBar editor={editor} />
            </BubbleMenu>
          )}
          <MenuBar editor={editor} />
          <EditorContent editor={editor} className="h-full overflow-y-auto" />
          <TextLength content={editor.getText()} />
          <TagsInput tags={tags} setTags={setTags} />
          <div className="flex flex-col gap-2">
            <List className="relative flex flex-1 items-start justify-between gap-2">
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
            <Button
              isLoading={isPending}
              disabled={editor.getText().length === 0 || !selectedEmotion}
              type="submit"
              className="self-end text-nowrap"
            >
              등록하기
            </Button>
          </div>
        </div>
      </form>
    </Modal>
  )
}
