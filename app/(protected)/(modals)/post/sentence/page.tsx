'use client'

import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { BubbleMenu, EditorContent } from '@tiptap/react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import { meQuery } from '@/services/queries/auth/meQuery'
import { useInput } from '@/hooks/useInput'
import useAddSentence from '@/services/mutates/sentence/useAddSentence'
import useBlockEditor from '@/hooks/useBlockEditor'

import Modal from '@/components/shared/Modal'
import Button from '@/components/shared/Button'
import { TagsInput } from '@/components/shared/TagsInput'
import BubbleMenuBar from '@/components/feature/text_editor/BubbleMenuBar'
import TextLength from '@/components/feature/text_editor/TextLength'
import DropDown from './_components/DropDown'
import Icon from '@/components/shared/Icon'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import EmotionPicker from '@/components/feature/sentence/EmotionPicker'

export default function SentenceModal() {
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [content, _, setContent] = useInput<string>('')
  const [selectedEmotion, setSelectedEmotion] = useState('')
  const [accessType, setAccessType] = useState<'public' | 'private'>('public')
  const { editor } = useBlockEditor({
    setContent,
    content,
    editable: true,
    placeholder: '오늘 당신의 생각을 한 줄로 기록하세요.',
  })
  const [tags, setTags] = useState<string[]>([])
  const { mutate: addSentence, isPending } = useAddSentence()
  const router = useRouter()
  const { close, onClick, onTransitionEnd, ref } =
    useStateChange<HTMLUListElement>()
  const {
    ref: arrowRef,
    close: arrowDown,
    onClick: onClickArrow,
  } = useStateChange<HTMLDivElement>('rotate-0')
  const buttonRef = useOutsideClick<HTMLButtonElement>(() => {
    close()
    arrowDown()
  })

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
        user_id: me!.userId,
        user_name: me!.user_name,
        email: me!.email,
        avatar_url: me!.avatar_url,
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

  const changeAccessType = (order: 'private' | 'public') => {
    setAccessType(order)
  }

  const handleAccessTypeClick = () => {
    onClick()
    onClickArrow()
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
          <EditorContent editor={editor} className="h-full overflow-y-auto" />
          <TextLength content={editor.storage.characterCount.characters()} />
          <TagsInput tags={tags} setTags={setTags} />
          <div className="flex flex-col gap-2">
            <div className="flex justify-between">
              <div className="flex gap-2">
                <div className="relative">
                  <Button
                    ref={buttonRef}
                    variant="secondary"
                    onClick={handleAccessTypeClick}
                    size="sm"
                    className="w-fit gap-2 font-normal dark:bg-var-darkgray"
                  >
                    {accessType === 'public' ? '공개' : '비공개'}
                    <div
                      ref={arrowRef}
                      data-status="closed"
                      className="rotate-180 transition data-[status=closed]:rotate-0"
                    >
                      <Icon view="0 -960 960 960" size={18}>
                        <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
                      </Icon>
                    </div>
                  </Button>
                  <DropDown
                    targetRef={ref}
                    onTransitionEnd={onTransitionEnd}
                    onClick={changeAccessType}
                  />
                </div>
                <div>
                  <EmotionPicker
                    selectedEmotion={selectedEmotion}
                    onChangeEmotion={handleChangeEmotion}
                  />
                </div>
                {/* <List className="relative flex items-start justify-between gap-2">
                  {EMOTION_STATUS.map((emotion) => (
                    <EmotionPicker
                      key={emotion.status}
                      emotion={emotion}
                      selectedEmotion={selectedEmotion}
                      onChangeEmotion={handleChangeEmotion}
                    />
                  ))}
                </List> */}
              </div>

              <Button
                isLoading={isPending}
                disabled={editor.getText().length === 0 || !selectedEmotion}
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
    </Modal>
  )
}
