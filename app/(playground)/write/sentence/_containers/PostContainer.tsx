'use client'

import BubbleMenuBar from '../_components/BubbleMenuBar'
import { BubbleMenu, EditorContent } from '@tiptap/react'
import { TagsInput } from '@/components/shared/TagsInput'
import Button from '@/components/shared/Button'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useInput } from '@/hooks/useInput'
import { FormEvent, useEffect, useState } from 'react'
import useBlockEditor from '@/hooks/useBlockEditor'
import useAddSentence from '@/services/mutates/sentence/useAddSentence'
import { meQuery } from '@/services/queries/auth/meQuery'
import { supabase } from '@/lib/supabase/client'
import { useRouter, useSearchParams } from 'next/navigation'
import Input from '@/components/shared/Input'
import Line from '@/components/shared/Line'
import EmotionSection from '../_components/EmotionSection'
import PublishSection from '../_components/PublishSection'
import Avatar from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import Title from '@/components/shared/Title'
import EmotionGauge from '@/app/(playground)/home/_components/EmotionGauge'
import PostTypeSection from '../_components/PostTypeSection'
import { sentenceQuery } from '@/services/queries/sentence/sentenceQuery'
import useUpdateSentence from '@/services/mutates/sentence/useUpdateSentence'

export type TAccess = 'public' | 'private'
export type TPost = 'journal' | 'article'
export type TEmotion = '0%' | '25%' | '50%' | '75%' | '100%'

export default function PostContainer() {
  const router = useRouter()
  const sentenceId = useSearchParams().get('sentence_id')
  const { data: me } = useSuspenseQuery(meQuery.getUserSession(supabase))
  const { data: sentence } = useSuspenseQuery(
    sentenceQuery.getSentence(supabase, parseInt(sentenceId || '')),
  )
  const [content, setContent] = useState(sentence?.content ?? '')
  const [title, onChangeTitle, setTitle] = useInput<string | null>(null)
  const [selectedEmotion, setSelectedEmotion] = useState<TEmotion | null>('50%')
  const [accessType, setAccessType] = useState<TAccess>('public')
  const [postType, setPostType] = useState<TPost>('journal')
  const { editor } = useBlockEditor({
    setContent,
    content,
    editable: true,
    placeholder: '오늘 당신의 생각과 감정을 기록하세요.',
  })
  const [tags, setTags] = useState<string[]>([])
  const { mutate: addSentence, isPending } = useAddSentence()
  const { mutate: updateSentence } = useUpdateSentence()

  const handleChangeEmotion = (emotion: TEmotion | null) =>
    setSelectedEmotion(emotion)
  const handleChangeAccessType = (order: TAccess) => setAccessType(order)
  const handleChangePostType = (order: TPost) => setPostType(order)
  const handleInputFocus = () => editor?.commands.focus('end')
  const handleInitPostData = () => {
    setTitle(sentence.title)
    editor?.commands.setContent(content)
    setPostType(sentence.post_type)
    setAccessType(sentence.access_type)
    setSelectedEmotion(sentence.emotion_level ? sentence.emotion_level : null)
  }

  const handleSubmitSentence = (e: FormEvent) => {
    e.preventDefault()

    const newSentence = {
      content,
      emotion_level: postType === 'journal' ? selectedEmotion : null,
      user_id: me!.userId,
      tags,
      title,
      access_type: accessType,
      post_type: postType,
    }

    sentence
      ? updateSentence(
          {
            ...newSentence,
            id: sentence.id,
          },
          {
            onSuccess: () => {
              router.push('/success')
              router.back()
            },
          },
        )
      : addSentence(newSentence, {
          onSuccess: () => {
            router.push('/success')
            router.back()
          },
        })
  }

  useEffect(() => {
    postType === 'article'
      ? handleChangeEmotion(null)
      : handleChangeEmotion('50%')
  }, [postType])

  useEffect(() => {
    if (sentence && editor) {
      handleInitPostData()
    }
  }, [sentence, editor])

  return (
    <form
      onSubmit={handleSubmitSentence}
      className="flex h-fit flex-col rounded-md bg-white p-4 shadow-md dark:bg-var-darkgray"
    >
      <div className="flex items-center gap-4">
        <Avatar src={me?.avatar_url} size="sm" ring />
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
        value={title || ''}
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
            <PostTypeSection
              postType={postType}
              onChangePostType={handleChangePostType}
            />
            <EmotionSection
              selectedEmotion={selectedEmotion}
              onChangeEmotion={handleChangeEmotion}
            />
          </div>
          <Button
            isLoading={isPending}
            disabled={
              editor?.storage.characterCount.characters() === 0 ||
              tags.length > 10
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
