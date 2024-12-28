'use client'

import { XStack, YStack } from '@/src/components/Stack'
import { routes } from '@/src/routes'
import Avatar from '@/src/components/Avatar'
import Title from '@/src/components/Title'
import Text from '@/src/components/Text'
import RenderActionButtonFromAuthorInfo from '@/src/app/(playground)/post/view/@post/[postId]/_components/RenderActionButtonFromAuthorInfo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'
import useFollowQueries from '@/src/hooks/queries/useFollowQueries'
import useRouterPush from '@/src/hooks/useRouterPush'
import { meQuery } from '@/src/services/queries/auth/me-query'

interface Props {
  postId: number
}

export default function PostAuthorInfo({ postId }: Props) {
  const { data: session } = useSuspenseQuery(meQuery.getSession(supabase))
  const { data: post } = useSuspenseQuery(
    postQuery.getPost(supabase, postId, session?.userId),
  )
  const pushNewPostPage = useRouterPush(routes.profile.view(post?.user_id))
  const { isFollowing } = useFollowQueries(post?.user_id)

  return (
    <YStack>
      <YStack
        gap={4}
        className="w-full rounded-md bg-var-lightgray p-4 transition duration-300 hover:shadow-lg sm:flex-row dark:bg-var-dark"
      >
        <XStack onClick={pushNewPostPage} className="flex flex-1 gap-4">
          <Avatar src={post?.user_info.avatar_url} size="md" />
          <YStack gap={1} className="w-full">
            <Title size="sm">{post?.user_info.user_name}</Title>
            <Text type="caption">{post?.user_info.email}</Text>
            <Text>{post?.user_info.about_me}</Text>
          </YStack>
          <RenderActionButtonFromAuthorInfo
            session={session}
            isFollowing={isFollowing}
            userId={post?.user_id}
          />
        </XStack>
      </YStack>
    </YStack>
  )
}
