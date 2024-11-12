import { YStack } from '@/components/shared/Stack'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { createServerClient } from '@/lib/supabase/server'
import { postQuery } from '@/services/queries/post/postQuery'
import { IPostWithUserInfo } from '@/types/post'
import PostContainer from './_containers/PostContainer'

interface Props {
  params: { postId: string }
}

export async function generateMetadata({ params }: Props) {
  const queryClient = getQueryClient()
  const supabase = createServerClient()
  await queryClient.prefetchQuery(
    postQuery.getPost(supabase, Number(params.postId)),
  )
  const post = queryClient.getQueryData<IPostWithUserInfo>([
    'post',
    Number(params.postId),
  ])
  return {
    title: post?.title ?? `${post?.user_info.user_name}님의 글`,
  }
}

export default function PostPage({ params }: Props) {
  const postId = parseInt(params.postId)

  return (
    <YStack gap={8} className="flex-1 animate-fade-in">
      <PostContainer postId={postId} />
    </YStack>
  )
}
