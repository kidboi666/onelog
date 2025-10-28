import { IPost } from '@/src/types/entities/post'
import useBlockEditor from '@/src/hooks/useBlockEditor'
import useRouterPushWithTransition from '@/src/hooks/useRouterPushWithTransition'
import { ROUTES } from '@/src/routes'
import { YStack } from '@/src/components/Stack'
import PostCardContent from './PostCardContent'
import PostHeader from './PostHeader'

interface Props {
  post: IPost
  createdAtLiked?: string
  disabled?: boolean
}

export default function PostCard({ post, createdAtLiked, disabled }: Props) {
  const postId = Number(post?.id)
  const content = post?.content
  const tags = post?.tags || []
  const [, pushPostDetail] = useRouterPushWithTransition(
    ROUTES.POST.VIEW(postId),
  )

  const { editor } = useBlockEditor({
    content,
  })

  if (!editor) return null

  const {
    accessType,
    title,
    likeCount,
    isLiked,
    commentCount,
    userId,
    postType,
    emotionLevel,
    createdAt,
  } = post
  return (
    <YStack>
      {post ? (
        <PostHeader
          userId={userId}
          createdAtLiked={createdAtLiked}
          postType={postType}
          email={post.userInfo.email}
          avatarUrl={post.userInfo.avatarUrl}
          userName={post.userInfo.userName}
          emotionLevel={emotionLevel}
          createdAt={createdAt}
        />
      ) : null}
      <PostCardContent
        tags={tags}
        editor={editor}
        postTitle={title}
        accessType={accessType}
        likeCount={likeCount?.[0].count}
        isLike={isLiked?.length > 0}
        commentCount={commentCount?.[0].count}
        postId={postId}
        onClick={pushPostDetail}
        disabled={disabled}
      />
    </YStack>
  )
}
