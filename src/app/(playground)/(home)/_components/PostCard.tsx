import useBlockEditor from '@/src/hooks/useBlockEditor'

import PostCardContent from './PostCardContent'
import { YStack } from '@/src/components/Stack'
import { routes } from '@/src/routes'
import { IPostWithUserInfo } from '@/src/types/post'
import PostHeader from './PostHeader'
import { TEmotion } from '@/src/app/(playground)/post/edit/page'
import useRouterPushWithTransition from '@/src/hooks/useRouterPushWithTransition'

interface Props {
  post: IPostWithUserInfo
  postUserInfo?: any
  createdAtLiked?: string
  disabled?: boolean
}

export default function PostCard({
  post,
  postUserInfo,
  createdAtLiked,
  disabled,
}: Props) {
  const postId = Number(post?.id)
  const content = post?.content
  const tags = post?.tags || []
  const [, pushPostDetail] = useRouterPushWithTransition(
    routes.post.view(postId),
  )

  const { editor } = useBlockEditor({
    content,
  })

  if (!editor) return null

  const {
    access_type,
    title,
    like,
    comment,
    user_id,
    post_type,
    emotion_level,
    created_at,
  } = post

  return (
    <YStack>
      {post ? (
        <PostHeader
          userId={user_id}
          createdAtLiked={createdAtLiked}
          postType={post_type}
          email={postUserInfo.email}
          avatarUrl={postUserInfo.avatar_url}
          userName={postUserInfo.user_name}
          emotionLevel={emotion_level as TEmotion}
          createdAt={created_at}
        />
      ) : null}
      <PostCardContent
        tags={tags}
        editor={editor}
        postTitle={title}
        accessType={access_type}
        likeCount={like[0].count}
        commentCount={comment[0].count}
        postId={postId}
        onClick={pushPostDetail}
        disabled={disabled}
      />
    </YStack>
  )
}
