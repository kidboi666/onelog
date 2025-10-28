'use client'

import dynamic from 'next/dynamic'
import { useSuspenseQuery } from '@tanstack/react-query'
import { useMe } from '@/src/store/hooks/useMe'
import { postQuery } from '@/src/services/queries/post/post-query'
import { XStack } from '@/src/components/Stack'
import usePostForm from '@/src/app/(playground)/post/edit/_hooks/usePostForm'

const PostForm = dynamic(
  () => import('@/src/app/(playground)/post/edit/_components/PostForm'),
  { ssr: false }
)
const SideOptionsBar = dynamic(
  () => import('@/src/app/(playground)/post/edit/_components/SideOptionsBar'),
  { ssr: false }
)

interface Props {
  searchParams: { post_id: string }
}

export default function Page({ searchParams: { post_id: postId } }: Props) {
  const { me } = useMe()
  const { data: post } = useSuspenseQuery(postQuery.getPost(Number(postId)))
  const { states, actions } = usePostForm(post ?? null)
  const { accessType, postType, emotionLevel } = states
  const { onChangeAccessType, onChangePostType, onChangeEmotion } = actions

  if (!me) {
    return null
  }

  const { avatarUrl, userName, email } = me

  return (
    <XStack gap={8} className="flex-1 animate-fade-in">
      <PostForm
        postId={Number(postId)}
        meId={me.id}
        avatarUrl={avatarUrl}
        userName={userName}
        email={email}
        formState={states}
        actions={actions}
      />
      <SideOptionsBar
        accessType={accessType}
        emotionLevel={emotionLevel}
        postType={postType}
        onChangeEmotion={onChangeEmotion}
        onChangePostType={onChangePostType}
        onChangeAccessType={onChangeAccessType}
      />
    </XStack>
  )
}
