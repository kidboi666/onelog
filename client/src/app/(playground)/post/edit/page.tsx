'use client'

import { useQuery, useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { XStack } from '@/src/components/Stack'
import PostForm from '@/src/app/(playground)/post/edit/_components/PostForm'
import SideOptionsBar from '@/src/app/(playground)/post/edit/_components/SideOptionsBar'
import usePostForm from '@/src/app/(playground)/post/edit/_hooks/usePostForm'

interface Props {
  searchParams: { post_id: string }
}

export default function Page({ searchParams }: Props) {
  const postId = Number(searchParams?.post_id)
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: me } = useQuery(meQuery.getUserInfo(supabase, session?.id))
  const { data: post } = useQuery(postQuery.getPost(supabase, postId))
  const { formState, actions } = usePostForm(post ?? null)

  const { accessType, postType, emotionLevel } = formState
  const { onChangeAccessType, onChangePostType, onChangeEmotion } = actions

  if (!me) {
    return null
  }

  const { avatarUrl, userName, email } = me

  return (
    <XStack gap={8} className="flex-1 animate-fade-in">
      <PostForm
        postId={postId}
        meId={me.id}
        avatarUrl={avatarUrl}
        userName={userName}
        email={email}
        formState={formState}
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
