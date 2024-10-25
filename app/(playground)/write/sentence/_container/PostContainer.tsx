'use client'

import BubbleMenuBar from '../_components/BubbleMenuBar'
import { BubbleMenu, EditorContent } from '@tiptap/react'
import { TagsInput } from '@/components/shared/TagsInput'
import Button from '@/components/shared/Button'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useInput } from '@/hooks/useInput'
import { FormEvent, useState } from 'react'
import useBlockEditor from '@/hooks/useBlockEditor'
import useAddSentence from '@/services/mutates/sentence/useAddSentence'
import { meQuery } from '@/services/queries/auth/meQuery'
import { supabase } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import Input from '@/components/shared/Input'
import Line from '@/components/shared/Line'
import EmotionSection from '../_components/EmotionSection'
import PublishSection from '../_components/PublishSection'
import Avatar from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import EmotionGauge from '@/app/(playground)/home/_components/EmotionGauge'

export default function PostContainer() {
  const router = useRouter()
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const [content, _, setContent] = useInput<string>('')
  const [selectedEmotion, setSelectedEmotion] = useState('0')
  const [accessType, setAccessType] = useState<'public' | 'private'>('public')
  const { editor } = useBlockEditor({
    setContent,
    content,
    editable: true,
    placeholder: '오늘 당신의 생각과 감정을 기록하세요.',
  })
  const [title, onChangeTitle] = useInput('')
  const [tags, setTags] = useState<string[]>([])
  const { mutate: addSentence, isPending } = useAddSentence()

  const handleChangeEmotion = (emotion: string) => {
    setSelectedEmotion(emotion)
  }

  const handleChangeAccessType = (order: 'private' | 'public') => {
    setAccessType(order)
  }

  const handleInputFocus = () => {
    if (editor) {
      editor.commands.focus('end')
    }
  }

  const handleSubmitSentence = (e: FormEvent) => {
    e.preventDefault()

    addSentence(
      {
        content,
        emotion_level: selectedEmotion,
        user_id: me!.userId,
        tags,
        title,
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
  const handleAuthGuard = () => {
    me ? null : router.push('/auth_guard')
  }

  if (!editor) return null

  return (
    <form
      onSubmit={handleSubmitSentence}
      onClick={handleAuthGuard}
      className="flex h-fit flex-col rounded-md bg-white p-4 shadow-md dark:bg-var-darkgray"
    >
      <div className="flex items-center gap-4">
        <Avatar src={me?.avatar_url} size="sm" ring="xs" />
        <div className="flex w-full flex-col self-end">
          <Title type="sub" size="sm">
            {me?.user_name}
          </Title>
          <Text type="caption">{me?.email}</Text>
        </div>
        <EmotionGauge
          emotionLevel={selectedEmotion}
          onClick={handleChangeEmotion}
          className="self-end"
        />
      </div>
      <Line className="my-4" />
      <Input
        value={title}
        onChange={onChangeTitle}
        disabled={me === null}
        variant="secondary"
        dimension="none"
        className="my-4 w-full overflow-x-auto text-3xl"
        placeholder="제목을 입력해 주세요."
      />
      <div className="flex max-h-full cursor-text flex-col">
        {editor && (
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <BubbleMenuBar editor={editor} />
          </BubbleMenu>
        )}
        <EditorContent editor={editor} disabled={me === null} />
        <div onClick={handleInputFocus} className="h-20 max-h-full w-full" />
      </div>
      <div className="flex flex-col">
        <TagsInput tags={tags} setTags={setTags} disabled={me === null} />
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <PublishSection
              accessType={accessType}
              onChangeAccessType={handleChangeAccessType}
            />
            <EmotionSection
              selectedEmotion={selectedEmotion}
              onChangeEmotion={handleChangeEmotion}
            />
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
    </form>
  )
}
