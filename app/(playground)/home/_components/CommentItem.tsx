import { Suspense, useState } from 'react'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase/client'

import { commentQuery } from '@/services/queries/comment/commentQuery'
import { countFollowQuery } from '@/services/queries/follow/countFollowQuery'
import { followQuery } from '@/services/queries/follow/followQuery'
import { countCommentQuery } from '@/services/queries/comment/countCommentQuery'
import { formatDateElapsed } from '@/utils/formatDate'
import { ICommentWithUserInfo } from '@/types/comment'
import { IUserInfoWithMBTI } from '@/types/auth'

import Text from '@/components/shared/Text'
import Spinner from '@/components/shared/Spinner'
import { XStack, YStack } from '@/components/shared/Stack'
import CommentInputButton from './CommentInputButton'
import CommentButton from './CommentButton'
import CommentInput from './CommentInput'
import AvatarButtonWithDropDown from './AvatarButtonWithDropDown'
import ReportButton from './ReportButton'
import OptionButtonWithDropDown from './OptionButtonWithDropDown'

interface Props {
  comment: ICommentWithUserInfo
  sentenceId: number
  me?: IUserInfoWithMBTI
  isLastComment?: boolean
}

export default function CommentItem({
  comment,
  sentenceId,
  me,
  isLastComment,
}: Props) {
  const [showComment, setShowComment] = useState(true)
  const [showCommentInput, setShowCommentInput] = useState(false)
  const { data: commentToComments } = useSuspenseQuery(
    commentQuery.getCommentToComment(supabase, sentenceId, comment?.id),
  )
  const { data: commentToCommentsCount } = useSuspenseQuery(
    countCommentQuery.countCommentFromComment(supabase, sentenceId, comment.id),
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
    (user) => user.follower_user_id === me?.id,
  )
  const isOwner = comment.user_id === me?.id

  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  const handleShowCommentInput = () => {
    setShowCommentInput((prev) => !prev)
  }

  return (
    <XStack className="w-full">
      <AvatarButtonWithDropDown
        avatarUrl={comment.user_info.avatar_url}
        isLastComment={isLastComment}
        followerCount={followerCount}
        followingCount={followingCount}
        isFollowing={!!isFollowing}
        userId={comment.user_id}
        isMe={me?.id === comment.user_id}
        userName={comment.user_info.user_name}
      />
      <YStack className="flex-1">
        <YStack gap={1}>
          <XStack className="items-end">
            <Text>{comment.user_info.user_name}</Text>
            <Text as="span" type="caption" size="sm">
              @{comment.user_info.email?.split('@')[0]}
            </Text>
          </XStack>
          <XStack>
            <Text type="caption" size="sm">
              {formatDateElapsed(comment.created_at)}
            </Text>
          </XStack>
          <div className="w-fit rounded-md bg-var-lightgray p-2 dark:bg-var-dark">
            <Text>{comment.content}</Text>
          </div>
          <XStack gap={0}>
            {commentToComments.length >= 1 && (
              <CommentButton
                showComment={showComment}
                onShowComment={handleShowComment}
                commentCount={commentToCommentsCount ?? 0}
              />
            )}
            <CommentInputButton onShowCommentInput={handleShowCommentInput} />
            <ReportButton commentId={comment.id} />
            {isOwner && (
              <OptionButtonWithDropDown
                isOwner
                commentId={comment.id}
                sentenceId={sentenceId}
              />
            )}
          </XStack>
        </YStack>
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
            <Suspense
              key={comment.id}
              fallback={
                <Spinner.Container>
                  <Spinner size={40} />
                </Spinner.Container>
              }
            >
              <CommentItem
                sentenceId={sentenceId}
                comment={comment}
                me={me}
                isLastComment
              />
            </Suspense>
          ))}
      </YStack>
    </XStack>
  )
}
