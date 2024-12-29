'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { supabase } from '@/src/lib/supabase/client'
import { meQuery } from '@/src/services/queries/auth/me-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import useFollowValidate from '@/src/hooks/queries/useFollowValidate'
import { ROUTES } from '@/src/routes'
import Avatar from '@/src/components/Avatar'
import { XStack, YStack } from '@/src/components/Stack'
import Text from '@/src/components/Text'
import Title from '@/src/components/Title'
import RenderActionButtonFromAuthorInfo from '@/src/app/(playground)/post/view/@post/[postId]/_components/RenderActionButtonFromAuthorInfo'

interface Props {
  postId: number
}

export default function PostAuthorInfo({ postId }: Props) {
  const router = useRouter()
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId, session?.userId))
  const { isFollowing } = useFollowValidate(post?.user_id, session?.userId)

  const pushNewPostPage = () => router.push(ROUTES.PROFILE.VIEW(post?.user_id))

  const { user_info, user_id } = post || {}

  return (
    <YStack>
      <YStack
        gap={4}
        className="w-full rounded-md bg-var-lightgray p-4 transition duration-300 hover:shadow-lg sm:flex-row dark:bg-var-dark"
      >
        <XStack onClick={pushNewPostPage} className="flex flex-1 gap-4">
          <Avatar src={user_info.avatar_url} size="md" />
          <YStack gap={1} className="w-full">
            <Title size="sm">{user_info.user_name}</Title>
            <Text type="caption">{user_info.email}</Text>
            <Text>{user_info.about_me}</Text>
          </YStack>
          <RenderActionButtonFromAuthorInfo
            session={session}
            isFollowing={isFollowing}
            userId={user_id}
          />
        </XStack>
      </YStack>
    </YStack>
  )
}
