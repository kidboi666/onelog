'use client'

import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'
import usePostComment from '@/src/services/mutates/comment/usePostComment'
import { IUserInfo } from '@/src/types/entities/auth'
import useInput from '@/src/hooks/useInput'
import { ROUTES } from '@/src/routes'
import Avatar from '@/src/components/Avatar'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import { XStack } from '@/src/components/Stack'

interface Props {
  postId: number
  commentId?: number
  me: IUserInfo | null
}

export default function CommentInput({ postId, commentId, me }: Props) {
  const router = useRouter()
  const [content, onChangeContent, setContent] = useInput('')
  const { mutate: postComment, isPending: isPostPending } = usePostComment()

  const authGuard = () => router.push(ROUTES.MODAL.AUTH.GUARD)

  const handleRouterGuard = () => {
    if (me) {
      return null
    } else {
      authGuard()
    }
  }

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault()
    if (me) {
      postComment(
        {
          userId: me.id,
          content,
          postId: postId,
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
        <Avatar src={me?.avatarUrl} size="sm" shadow="sm" />
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
