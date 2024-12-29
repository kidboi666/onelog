import { postPrefetchQuery } from '@/src/services/queries/post/post-prefetch-query';



import Line from '@/src/components/Line';
import { YStack } from '@/src/components/Stack';



import PostActionBar from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostActionBar';
import PostAuthorInfo from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostAuthorInfo'
import PostBody from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostBody'
import PostHeader from '@/src/app/(playground)/post/view/@post/[postId]/_components/PostHeader'
import RenderCommentFromPost from '@/src/app/(playground)/post/view/@post/[postId]/_components/RenderCommentFromPost';





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

  return (
    <>
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
    </>
  )
}
