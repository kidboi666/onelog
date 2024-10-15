'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { BubbleMenu, EditorContent } from '@tiptap/react'
import { supabase } from '@/lib/supabase/client'

import { meQuery } from '@/services/queries/auth/meQuery'
import useAddSentence from '@/services/mutates/sentence/useAddSentence'
import { useInput } from '@/hooks/useInput'
import useBlockEditor from '@/hooks/useBlockEditor'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'

import Button from '@/components/shared/Button'
import { TagsInput } from '@/components/shared/TagsInput'
import BubbleMenuBar from '@/components/feature/text_editor/BubbleMenuBar'
import Icon from '@/components/shared/Icon'
import EmotionPicker from '@/components/feature/sentence/EmotionPicker'
import DropDown from './_components/DropDown'
import Text from '@/components/shared/Text'

export default function PostSentencePage() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [content, _, setContent] = useInput<string>('')
  const [selectedEmotion, setSelectedEmotion] = useState('')
  const [accessType, setAccessType] = useState<'public' | 'private'>('public')
  const { editor } = useBlockEditor({
    setContent,
    content,
    editable: true,
    placeholder: '오늘 당신의 생각과 감정을 기록하세요.',
  })
  const [tags, setTags] = useState<string[]>([])
  const { mutate: addSentence, isPending } = useAddSentence()
  const router = useRouter()
  const { close, onClick, onTransitionEnd, ref } =
    useStateChange<HTMLUListElement>()
  const {
    close: emotionClose,
    onClick: emotionClick,
    onTransitionEnd: emotionTransitionEnd,
    ref: emotionRef,
  } = useStateChange<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(() => {
    close()
    emotionClose()
  })

  if (!editor) return null

  const handleChangeEmotion = (emotion: string) => {
    setSelectedEmotion(emotion)
  }

  const changeAccessType = (order: 'private' | 'public') => {
    setAccessType(order)
  }

  const handleInputFocus = () => {
    editor.commands.focus('end')
  }

  const handleSubmitSentence = (e: FormEvent) => {
    e.preventDefault()

    addSentence(
      {
        content,
        emotion_level: selectedEmotion,
        user_id: me!.userId,
        tags,
        access_type: accessType,
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
    <form onSubmit={handleSubmitSentence} className="h-full">
      <div className="flex h-full flex-col gap-4">
        <div className="flex h-full cursor-text flex-col overflow-y-auto">
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <BubbleMenuBar editor={editor} />
            </BubbleMenu>
          )}
          <EditorContent editor={editor} className="" />
          <div onClick={handleInputFocus} className="size-full" />
        </div>
        <TagsInput tags={tags} setTags={setTags} />
        <div className="flex flex-col gap-2">
          <div className="flex justify-between">
            <div className="flex gap-4">
              <div className="relative place-self-center">
                <Button
                  ref={buttonRef}
                  variant="icon"
                  onClick={onClick}
                  size="none"
                >
                  <Icon view="0 -960 960 960" size={20}>
                    {accessType === 'public' ? (
                      <path d="M480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm-40-82v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm276-102q20-22 36-47.5t26.5-53q10.5-27.5 16-56.5t5.5-59q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v80q0 17-11.5 28.5T400-560h-80v80h240q17 0 28.5 11.5T600-440v120h40q26 0 47 15.5t29 40.5Z" />
                    ) : (
                      <path d="M819-28 701-146q-48 32-103.5 49T480-80q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-62 17-117.5T146-701L27-820l57-57L876-85l-57 57ZM440-162v-78q-33 0-56.5-23.5T360-320v-40L168-552q-3 18-5.5 36t-2.5 36q0 121 79.5 212T440-162Zm374-99-58-58q21-37 32.5-77.5T800-480q0-98-54.5-179T600-776v16q0 33-23.5 56.5T520-680h-80v45L261-814q48-31 103-48.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 61-17.5 116T814-261Z" />
                    )}
                  </Icon>
                </Button>
                <DropDown
                  targetRef={ref}
                  onTransitionEnd={onTransitionEnd}
                  onClick={changeAccessType}
                />
              </div>

              <div className="relative flex items-center gap-2 place-self-center">
                <Button variant="icon" size="none" onClick={emotionClick}>
                  <Icon view="0 -960 960 960" size={20}>
                    {selectedEmotion ? (
                      <path d="M480-800q134 0 227 93t93 227q0 134-93 227t-227 93q-134 0-227-93t-93-227q0-134 93-227t227-93Zm0 560q100 0 170-70t70-170q0-100-70-170t-170-70q-100 0-170 70t-70 170q0 100 70 170t170 70Zm0-100q48 0 86-27.5t54-72.5H340q16 45 54 72.5t86 27.5ZM340-560q0 17 11.5 28.5T380-520q17 0 28.5-11.5T420-560q0-17-11.5-28.5T380-600q-17 0-28.5 11.5T340-560Zm200 0q0 17 11.5 28.5T580-520q17 0 28.5-11.5T620-560q0-17-11.5-28.5T580-600q-17 0-28.5 11.5T540-560ZM40-720v-120q0-33 23.5-56.5T120-920h120v80H120v120H40ZM240-40H120q-33 0-56.5-23.5T40-120v-120h80v120h120v80Zm480 0v-80h120v-120h80v120q0 33-23.5 56.5T840-40H720Zm120-680v-120H720v-80h120q33 0 56.5 23.5T920-840v120h-80ZM480-480Z" />
                    ) : (
                      <path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z" />
                    )}
                  </Icon>
                </Button>
                <EmotionPicker
                  targetRef={emotionRef}
                  onTransitionEnd={emotionTransitionEnd}
                  selectedEmotion={selectedEmotion}
                  onChangeEmotion={handleChangeEmotion}
                />
                {selectedEmotion && (
                  <Text type="caption" size="xs">
                    선택된 감정 상태 :
                    {(selectedEmotion === '0%' && '매우나쁨') ||
                      (selectedEmotion === '25%' && '나쁨') ||
                      (selectedEmotion === '50%' && '보통') ||
                      (selectedEmotion === '75%' && '좋음') ||
                      (selectedEmotion === '100%' && '매우좋음')}
                  </Text>
                )}
              </div>
            </div>

            <Button
              isLoading={isPending}
              disabled={
                editor.storage.characterCount.characters() === 0 ||
                !selectedEmotion
              }
              type="submit"
              size="sm"
              className="self-end text-nowrap"
            >
              등록하기
            </Button>
          </div>
        </div>
      </div>
    </form>
  )
}
