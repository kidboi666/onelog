import { createPostServerAdapter } from '@/src/adapters/create-server-adapter'
import Line from '@/src/components/Line'
import { YStack } from '@/src/components/Stack'
import PostActionBar from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostActionBar'
import PostAuthorInfo from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostAuthorInfo'
import PostBody from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostBody'
import PostHeader from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostHeader'
import RenderCommentFromPost from '@/src/app/(playground)/post/view/@post/[postId]/_components/RenderCommentFromPost'

interface Props {
  params: { postId: string }
}

export async function generateMetadata({ params: { postId } }: Props) {
  const postServerAdapter = await createPostServerAdapter()
  const post = await postServerAdapter.getPost({ postId })

  return {
    title: post?.title ?? `${post?.userInfo.userName}님의 글`,
  }
}

export default async function PostPage({ params: { postId } }: Props) {
  return (
    <>
      <YStack gap={8} className="flex-1 animate-fade-in">
        <YStack className="rounded-md bg-white p-2 shadow-sm sm:gap-4 sm:p-4 dark:bg-var-darkgray">
          <PostHeader postId={Number(postId)} />
          <Line />
          <PostBody postId={Number(postId)} />
          <PostAuthorInfo postId={Number(postId)} />
          <PostActionBar postId={Number(postId)} />
        </YStack>
        <RenderCommentFromPost postId={Number(postId)} />
      </YStack>
    </>
  )
}
