import Avatar from '@/components/shared/Avatar'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import { XStack } from '@/components/shared/Stack'
import { routes } from '@/routes'
import { useInput } from '@/hooks/useInput'
import useMe from '@/hooks/useMe'
import usePostComment from '@/services/mutates/comment/usePostComment'
import { IUserInfoWithMBTI } from '@/types/auth'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

interface Props {
  sentenceId: number
  commentId?: number
  me?: IUserInfoWithMBTI
}

export default function CommentInput({ sentenceId, commentId, me }: Props) {
  const router = useRouter()
  const { session } = useMe()
  const [content, onChangeContent, setContent] = useInput('')
  const { mutate: postComment, isPending: isPostPending } = usePostComment()

  const handleRouterGuard = () => {
    if (session) {
      return null
    } else {
      router.push(routes.modal.auth.guard)
    }
  }

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault()
    if (session) {
      postComment(
        {
          userId: me?.id,
          content,
          sentenceId: sentenceId,
          commentId: commentId || null,
        },
        {
          onSuccess: () => {
            setContent('')
          },
        },
      )
    } else {
      return null
    }
  }

  return (
    <form
      onClick={handleRouterGuard}
      onSubmit={handlePostComment}
      className="mb-2 w-full"
    >
      <XStack gap={4}>
        <Avatar src={me?.avatar_url} size="sm" shadow="sm" />
        <Input
          value={content}
          onChange={onChangeContent}
          dimension="xs"
          placeholder={me ? '댓글을 달아주세요.' : '로그인을 해주세요'}
          className="w-full bg-var-lightgray dark:bg-var-dark"
        />
        <Button
          type="submit"
          disabled={!content || !me}
          isLoading={isPostPending}
          size="sm"
        >
          댓글달기
        </Button>
      </XStack>
    </form>
  )
}
