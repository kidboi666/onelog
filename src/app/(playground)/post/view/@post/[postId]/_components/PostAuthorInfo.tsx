'use client'

import { useSuspenseQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { useMe } from '@/src/store/hooks/useMe'
import { postQuery } from '@/src/services/queries/post/post-query'
import { ROUTES } from '@/src/routes'
import Avatar from '@/src/components/Avatar'
import { XStack, YStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'
import Title from '@/src/components/Title'
import RenderActionButtonFromAuthorInfo from '@/src/app/(playground)/post/view/@post/[postId]/_components/RenderActionButtonFromAuthorInfo'

interface Props {
  postId: number
}

export default function PostAuthorInfo({ postId }: Props) {
  const router = useRouter()
  const { me } = useMe()
  const { data: post } = useSuspenseQuery(postQuery.getPost(postId, me?.id))

  if (!post) {
    return null
  }

  const pushNewPostPage = () => router.push(ROUTES.PROFILE.VIEW(post.userId))

  const { userInfo, userId } = post

  return (
    <YStack>
      <YStack
        gap={4}
        className="w-full rounded-md bg-var-lightgray p-4 transition duration-300 hover:shadow-lg sm:flex-row dark:bg-var-dark"
      >
        <XStack onClick={pushNewPostPage} className="flex flex-1 gap-4">
          <Avatar src={userInfo.avatarUrl} size="md" />
          <YStack gap={1} className="w-full">
            <Title size="sm">{userInfo.userName}</Title>
            <TextDisplay type="caption">{userInfo.email}</TextDisplay>
            <TextDisplay>{userInfo.aboutMe}</TextDisplay>
          </YStack>
          <RenderActionButtonFromAuthorInfo meId={me?.id} userId={userId} />
        </XStack>
      </YStack>
    </YStack>
  )
}
