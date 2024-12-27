import { YStack } from '@/src/components/Stack'
import { HydrationBoundary } from '@tanstack/react-query'
import { postPrefetchQuery } from '@/src/services/queries/post/post-prefetch-query'
import PostHeader from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostHeader'
import Line from '@/src/components/Line'
import PostBody from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostBody'
import PostAuthorInfo from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostAuthorInfo'
import PostActionBar from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostActionBar'
import RenderCommentFromPost from '@/src/app/(playground)/post/view/@post/[postId]/_components/RenderCommentFromPost'

interface Props {
  params: { postId: string }
}

export async function generateMetadata({ params }: Props) {
  const postId = Number(params.postId)
  const post = await postPrefetchQuery.metadata(postId)
  return {
    title: post?.title ?? `${post?.user_info.user_name}님의 글`,
  }
}

export default async function PostPage({ params }: Props) {
  const postId = Number(params.postId)
  const state = await postPrefetchQuery.data(postId)

  return (
    <HydrationBoundary state={state}>
      <YStack gap={8} className="flex-1 animate-fade-in">
        <YStack className="rounded-md bg-white p-2 shadow-sm sm:gap-4 sm:p-4 dark:bg-var-darkgray">
          <PostHeader postId={postId} />
          <Line />
          <PostBody postId={postId} />
          <PostAuthorInfo postId={postId} />
          <PostActionBar postId={postId} />
        </YStack>
        <RenderCommentFromPost postId={postId} />
      </YStack>
    </HydrationBoundary>
  )
}
