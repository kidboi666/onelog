'use client'

import { useState } from 'react'
import { formatDateElapsed } from '@/src/utils/formatDate'

import Text from '@/src/components/Text'
import { XStack, YStack } from '@/src/components/Stack'
import CommentInputButton from './CommentInputButton'
import CommentButton from './CommentButton'
import CommentInput from './CommentInput'
import AvatarButtonWithDropDown from './AvatarButtonWithDropDown'
import ReportButton from './ReportButton'
import OptionButtonWithDropDown from './OptionButtonWithDropDown'
import { IComment } from '@/src/types/comment'
import { getQueryClient } from '@/src/lib/tanstack/get-query-client'
import { queryKey } from '@/src/lib/tanstack/query-key'
import { IPost } from '@/src/types/post'
import { IUserSession } from '@/src/types/auth'

interface Props {
  comment: IComment
  postId: number
  session: IUserSession
}

export default function CommentItem({ comment, postId, session }: Props) {
  const [showCommentInput, setShowCommentInput] = useState(false)
  let setCommentToComments: IComment[] | null = null

  if (comment.comment) {
    const queryClient = getQueryClient()
    const post = queryClient.getQueryData<IPost>(queryKey.post.detail(postId))
    setCommentToComments = post!.comments
      .filter((v) => v.comment_id === comment.id)
      .sort(
        (a, b) =>
          Number(new Date(a.created_at)) - Number(new Date(b.created_at)),
      )
  }

  const handleShowCommentInput = () => {
    setShowCommentInput((prev) => !prev)
  }

  return (
    <XStack className="w-full">
      <AvatarButtonWithDropDown
        avatarUrl={comment.user_info.avatar_url}
        userId={comment.user_id}
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
            {comment.comment_id && (
              <CommentButton commentCount={comment.comment ?? 0} />
            )}
            <CommentInputButton onShowCommentInput={handleShowCommentInput} />
            <ReportButton commentId={comment.id} />
            <OptionButtonWithDropDown
              commentAuthorId={comment.user_id}
              commentId={comment.id}
              postId={postId}
            />
          </XStack>
        </YStack>
        {showCommentInput && (
          <CommentInput
            postId={postId}
            commentId={comment.id}
            session={session}
          />
        )}
        {setCommentToComments &&
          setCommentToComments.map((comment) => (
            <CommentItem
              key={comment.id}
              postId={postId}
              comment={comment}
              session={session}
            />
          ))}
      </YStack>
    </XStack>
  )
}
