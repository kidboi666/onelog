import { useRouter } from 'next/navigation'
import { MouseEvent, Suspense, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'
import useFavoriteComment from '@/services/mutates/comment/useFavoriteComment'
import { commentQuery } from '@/services/queries/comment/commentQuery'
import { formatDateToHM } from '@/utils/formatDate'
import Avatar from '@/components/shared/Avatar'
import Text from '@/components/shared/Text'
import { List } from '@/components/shared/List'
import Spinner from '@/components/shared/Spinner'
import Button from '@/components/shared/Button'
import CommentInputButton from './CommentInputButton'
import CommentButton from './CommentButton'
import CommentInput from './CommentInput'
import { IUserSession } from '@/services/queries/auth/meQuery'
import { ICommentWithUserInfo } from '@/types/comment'
import AvatarButtonWithDropDown from './AvatarButtonWithDropDown'
import { countFollowQuery } from '@/services/queries/follow/countFollowQuery'
import { followQuery } from '@/services/queries/follow/followQuery'

interface Props {
  comment: ICommentWithUserInfo
  sentenceId: number
  me: IUserSession | null
}

export default function CommentItem({ comment, sentenceId, me }: Props) {
  const router = useRouter()
  const [showComment, setShowComment] = useState(true)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const { data: commentToComments } = useSuspenseQuery(
    commentQuery.getCommentToComment(supabase, sentenceId, comment?.id),
  )
  const { data: followerCount } = useSuspenseQuery(
    countFollowQuery.countFollower(supabase, comment.user_id),
  )
  const { data: followingCount } = useSuspenseQuery(
    countFollowQuery.countFollowing(supabase, comment.user_id),
  )
  const { data: followers } = useSuspenseQuery(
    followQuery.getFollower(supabase, comment?.user_id),
  )
  const isFollowing = followers?.find(
    (user) => user.follower_user_id === me?.userId,
  )

  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  const handleShowCommentInput = () => {
    setShowCommentInput((prev) => !prev)
  }

  const handleAvatarClick = () => {
    router.replace(`/profile/${comment?.user_id}`)
  }

  return (
    <List.Row className="mb-4 flex w-full gap-2">
      <div className="h-fit">
        {/* <Button variant="none" onClick={handleAvatarClick} className="p-0">
          <Avatar src={comment.user_info.avatar_url} size="sm" shadow="sm" />
        </Button> */}
        <AvatarButtonWithDropDown
          avatarUrl={comment.user_info.avatar_url}
          followerCount={followerCount}
          followingCount={followingCount}
          isFollowing={!!isFollowing}
          userId={comment.user_id}
          isMe={me?.userId === comment.user_id}
          userName={comment.user_info.user_name}
        />
      </div>
      <div className="flex flex-1 flex-col gap-2">
        <div>
          <div className="flex items-end gap-2">
            <Text>{comment.user_info.user_name}</Text>
            <Text as="span" type="caption" size="sm">
              님의 댓글
            </Text>
          </div>
          <div className="flex gap-2">
            <Text type="caption" size="sm">
              {comment.user_info.email}
            </Text>
            <Text type="caption" size="sm">
              {formatDateToHM(comment.created_at)}
            </Text>
          </div>
        </div>
        <div>
          <div className="w-fit rounded-md bg-var-lightgray p-2 dark:bg-var-dark">
            <Text>{comment.content}</Text>
          </div>
          <div className="flex gap-1">
            {commentToComments.length >= 1 && (
              <CommentButton
                showComment={showComment}
                onShowComment={handleShowComment}
                commentCount={comment.comment ?? 0}
              />
            )}
            <CommentInputButton onShowCommentInput={handleShowCommentInput} />
          </div>
        </div>
        {showCommentInput && (
          <CommentInput
            sentenceId={sentenceId}
            commentId={comment.id}
            me={me}
          />
        )}
        {showComment &&
          commentToComments.length >= 1 &&
          commentToComments.map((comment) => (
            <Suspense key={comment.id} fallback={<Spinner size={40} />}>
              <CommentItem sentenceId={sentenceId} comment={comment} me={me} />
            </Suspense>
          ))}
      </div>
    </List.Row>
  )
}
