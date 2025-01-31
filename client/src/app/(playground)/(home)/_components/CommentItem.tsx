'use client'

import { IUserInfo } from '@/src/types/entities/auth'
import { IComment } from '@/src/types/entities/comment'
import useToggle from '@/src/hooks/useToggle'
import { formatDateElapsed } from '@/src/utils/client-utils'
import { XStack, YStack } from '@/src/components/Stack'
import TextDisplay from '@/src/components/TextDisplay'
import CommentInputButton from '@/src/app/(playground)/(home)/_components/CommentInputButton'
import CommentModifyInput from '@/src/app/(playground)/(home)/_components/CommentModifyInput'
import OptionButtonWithDropDown from '@/src/app/(playground)/(home)/_components/OptionButtonWithDropDown'
import useCommentReplies from '@/src/app/(playground)/(home)/_hooks/useCommentReplies'
import AvatarButtonWithDropDown from './AvatarButtonWithDropDown'
import CommentButton from './CommentButton'
import CommentInput from './CommentInput'
import ReportButton from './ReportButton'

interface Props {
  comment: IComment
  postId: number
  me: IUserInfo | null
}

export default function CommentItem({ comment, postId, me }: Props) {
  const { isOpen: showCommentInput, toggle: toggleShowCommentInput } =
    useToggle()
  const { isOpen: isModify, toggle: toggleModify } = useToggle()
  const commentToComments = useCommentReplies(comment.id, postId)

  return (
    <XStack className="w-full">
      <AvatarButtonWithDropDown
        avatarUrl={comment.userInfo.avatarUrl}
        userId={comment.userId}
        userName={comment.userInfo.userName}
      />
      <YStack className="flex-1">
        <YStack gap={1}>
          <XStack className="items-end">
            <TextDisplay>{comment.userInfo.userName}</TextDisplay>
            <TextDisplay as="span" type="caption" size="sm">
              @{comment.userInfo.email?.split('@')[0]}
            </TextDisplay>
          </XStack>
          <XStack>
            <TextDisplay type="caption" size="sm">
              {formatDateElapsed(comment.createdAt)}
            </TextDisplay>
          </XStack>

          {isModify ? (
            <CommentModifyInput comment={comment} onModify={toggleModify} />
          ) : (
            <div className="w-fit rounded-md bg-var-lightgray p-2 dark:bg-var-dark">
              <TextDisplay>{comment.content}</TextDisplay>
            </div>
          )}

          <XStack gap={0}>
            {comment.commentId && (
              <CommentButton commentCount={comment.comment ?? 0} />
            )}
            <CommentInputButton onShowCommentInput={toggleShowCommentInput} />
            <ReportButton commentId={comment.id} />
            <OptionButtonWithDropDown
              type="comment"
              onModify={toggleModify}
              commentAuthorId={comment.userId}
              commentId={comment.id}
              postId={postId}
            />
          </XStack>
        </YStack>
        {showCommentInput && (
          <CommentInput postId={postId} commentId={comment.id} me={me} />
        )}
        {commentToComments.length > 0 &&
          commentToComments.map((comment) => (
            <CommentItem
              key={comment.id}
              postId={postId}
              comment={comment}
              me={me}
            />
          ))}
      </YStack>
    </XStack>
  )
}
