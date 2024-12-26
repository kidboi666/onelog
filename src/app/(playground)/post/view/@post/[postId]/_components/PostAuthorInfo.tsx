'use client'

import { YStack } from '@/src/components/shared/Stack'
import Link from 'next/link'
import { routes } from '@/src/routes'
import Avatar from '@/src/components/shared/Avatar'
import Title from '@/src/components/shared/Title'
import Text from '@/src/components/shared/Text'
import RenderActionButtonFromAuthorInfo from '@/src/app/(playground)/post/view/@post/[postId]/_components/RenderActionButtonFromAuthorInfo'
import { useSuspenseQuery } from '@tanstack/react-query'
import { postQuery } from '@/src/services/queries/post/post-query'
import { supabase } from '@/src/lib/supabase/client'
import useMe from '@/src/hooks/useMe'
import useFollowQuery from '@/src/hooks/query/useFollowQuery'

interface Props {
  postId: number
}

export default function PostAuthorInfo({ postId }: Props) {
  const { data: post } = useSuspenseQuery(postQuery.getPost(supabase, postId))
  const { me } = useMe()
  const { isFollowing } = useFollowQuery({
    userId: post?.user_id,
    meId: me?.id,
  })

  return (
    <YStack>
      <YStack
        gap={4}
        className="w-full rounded-md bg-var-lightgray p-4 transition duration-300 hover:shadow-lg sm:flex-row dark:bg-var-dark"
      >
        <Link
          href={routes.profile.view(post?.user_id)}
          className="flex flex-1 gap-4"
        >
          <Avatar src={post?.user_info.avatar_url} size="md" />
          <YStack gap={1} className="w-full">
            <Title size="sm">{post?.user_info.user_name}</Title>
            <Text type="caption">{post?.user_info.email}</Text>
            <Text>{post?.user_info.about_me}</Text>
          </YStack>
          <RenderActionButtonFromAuthorInfo
            me={me}
            isFollowing={isFollowing}
            userId={post?.user_id}
          />
        </Link>
      </YStack>
    </YStack>
  )
}
