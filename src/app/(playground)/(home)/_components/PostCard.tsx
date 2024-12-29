import { routes } from '@/src/routes'

import { IPost } from '@/src/types/post'

import useBlockEditor from '@/src/hooks/useBlockEditor'
import useRouterPushWithTransition from '@/src/hooks/useRouterPushWithTransition'

import { YStack } from '@/src/components/Stack'

import { TEmotion } from '@/src/app/(playground)/post/edit/page'

import PostCardContent from './PostCardContent'
import PostHeader from './PostHeader'

interface Props {
  post: IPost
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
    like_count,
    is_liked,
    comment_count,
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
        likeCount={like_count?.[0].count}
        isLiked={is_liked?.length > 0}
        commentCount={comment_count?.[0].count}
        postId={postId}
        onClick={pushPostDetail}
        disabled={disabled}
      />
    </YStack>
  )
}
