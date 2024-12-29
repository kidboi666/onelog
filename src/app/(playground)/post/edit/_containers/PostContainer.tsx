'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { BubbleMenu, EditorContent } from '@tiptap/react'
import { useRouter } from 'next/navigation'
import { FormEvent, useEffect, useState } from 'react'
import { supabase } from '@/src/lib/supabase/client'
import useAddPost from '@/src/services/mutates/post/useAddPost'
import useUpdatePost from '@/src/services/mutates/post/useUpdatePost'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import useBlockEditor from '@/src/hooks/useBlockEditor'
import useInput from '@/src/hooks/useInput'
import { formatDateToMDY } from '@/src/utils/formatDate'
import { routes } from '@/src/routes'
import Avatar from '@/src/components/Avatar'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import Line from '@/src/components/Line'
import { XStack, YStack } from '@/src/components/Stack'
import { TagsInput } from '@/src/components/TagsInput'
import Text from '@/src/components/Text'
import Title from '@/src/components/Title'
import EmotionGauge from '@/src/app/(playground)/(home)/_components/EmotionGauge'
import BubbleMenuBar from '../_components/BubbleMenuBar'
import EmotionSection from '../_components/EmotionSection'
import PostTypeSection from '../_components/PostTypeSection'
import PublishSection from '../_components/PublishSection'
import { TAccess, TEmotion, TPost } from '../page'

interface Props {
  searchParams: { post_id: string }
  selectedEmotion: TEmotion
  onChangeEmotion: (emotion: TEmotion) => void
  accessType: TAccess
  onChangeAccessType: (accessType: TAccess) => void
  postType: TPost
  onChangePostType: (postType: TPost) => void
}

export default function PostContainer({
  searchParams,
  selectedEmotion,
  onChangeEmotion,
  accessType,
  onChangeAccessType,
  postType,
  onChangePostType,
}: Props) {
  const router = useRouter()
  const postId = Number(searchParams?.post_id)
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: me } = useSuspenseQuery(meQuery.getUserInfo(supabase, session?.userId))
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId))
  const [content, setContent] = useState(post?.content ?? '')
  const [title, onChangeTitle, setTitle] = useInput<string | null>(null)

  const { editor } = useBlockEditor({
    setContent,
    content,
    editable: true,
    placeholder: '오늘 당신의 생각과 감정을 기록하세요.',
  })
  const [tags, setTags] = useState<string[]>([])
  const { mutate: addPost, isPending, isSuccess } = useAddPost()
  const { mutate: updatePost } = useUpdatePost()

  const handleInputFocus = () => editor?.commands.focus('end')

  const handleInitPostData = () => {
    setTitle(post.title)
    editor?.commands.setContent(content)
    onChangePostType(post.post_type)
    onChangeAccessType(post.access_type)
    onChangeEmotion(post.emotion_level ? post.emotion_level : null)
  }

  const handleSubmitPost = (e: FormEvent) => {
    e.preventDefault()

    const newPost = {
      content,
      emotion_level: postType === 'journal' ? selectedEmotion : null,
      user_id: session!.userId,
      tags,
      title,
      access_type: accessType,
      post_type: postType,
    }

    post
      ? updatePost(
          {
            ...newPost,
            id: post.id,
          },
          {
            onSuccess: () => {
              router.replace(routes.modal.success)
            },
          },
        )
      : addPost(newPost, {
          onSuccess: () => {
            router.replace(routes.modal.success)
          },
        })
  }

  useEffect(() => {
    postType === 'article' ? onChangeEmotion(null) : onChangeEmotion('50%')
  }, [postType])

  useEffect(() => {
    if (post && editor) {
      handleInitPostData()
    }
  }, [post, editor])

  const { avatar_url, user_name, email } = me

  return (
    <form
      onSubmit={handleSubmitPost}
      className="h-fit w-full rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray"
    >
      <YStack gap={0}>
        <XStack gap={4}>
          <Avatar src={avatar_url} size="sm" ring />
          <YStack gap={0} className="self-end">
            <XStack gap={1} className="items-end">
              <Title size="xs" type="sub">
                {user_name}
              </Title>
              <Text as="span" type="caption" size="sm">
                · @{email?.split('@')[0]}
              </Text>
            </XStack>
            <Text type="caption" size="sm">
              {formatDateToMDY(new Date().getTime())}
            </Text>
          </YStack>
          <XStack className="flex-1 justify-end">
            <EmotionGauge emotionLevel={selectedEmotion} onClick={onChangeEmotion} />
          </XStack>
        </XStack>
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
        <YStack gap={0} className="max-h-full cursor-text">
          {editor && (
            <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
              <BubbleMenuBar editor={editor} />
            </BubbleMenu>
          )}
          <EditorContent editor={editor} disabled={me === null} />
          <div onClick={handleInputFocus} className="h-20 max-h-full w-full" />
        </YStack>
        <YStack>
          <TagsInput tags={tags} setTags={setTags} disabled={me === null} />
          <XStack className="justify-between">
            <XStack gap={4} className="items-center sm:hidden">
              <PublishSection accessType={accessType} onChangeAccessType={onChangeAccessType} />
              <PostTypeSection postType={postType} onChangePostType={onChangePostType} />
              <EmotionSection selectedEmotion={selectedEmotion} onChangeEmotion={onChangeEmotion} />
            </XStack>
            <XStack className="flex-1 justify-end">
              <Button
                isLoading={isPending}
                disabled={
                  editor?.storage.characterCount.characters() === 0 || tags.length > 10 || isSuccess
                }
                type="submit"
                size="sm"
              >
                등록하기
              </Button>
            </XStack>
          </XStack>
        </YStack>
      </YStack>
    </form>
  )
}
