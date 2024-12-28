'use client'

import Avatar from '@/src/components/Avatar'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import { XStack } from '@/src/components/Stack'
import { routes } from '@/src/routes'
import useInput from '@/src/hooks/useInput'
import usePostComment from '@/src/services/mutates/comment/usePostComment'
import { FormEvent } from 'react'
import useRouterPush from '@/src/hooks/useRouterPush'
import { useSuspenseQuery } from '@tanstack/react-query'
import { supabase } from '@/src/lib/supabase/client'
import { IUserSession } from '@/src/types/auth'
import { meQuery } from '@/src/services/queries/auth/me-query'

interface Props {
  postId: number
  commentId?: number
  session: IUserSession
}

export default function CommentInput({ postId, commentId, session }: Props) {
  const authGuard = useRouterPush(routes.modal.auth.guard)
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, session?.userId),
  )
  const [content, onChangeContent, setContent] = useInput('')
  const { mutate: postComment, isPending: isPostPending } = usePostComment()

  const handleRouterGuard = () => {
    if (session) {
      return null
    } else {
      authGuard()
    }
  }

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault()
    if (session) {
      postComment(
        {
          userId: session.userId,
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
        <Avatar src={me?.avatar_url} size="sm" shadow="sm" />
        <Input
          value={content}
          onChange={onChangeContent}
          dimension="xs"
          placeholder={session ? '댓글을 달아주세요.' : '로그인을 해주세요'}
          className="w-full bg-var-lightgray dark:bg-var-dark"
        />
        <Button
          type="submit"
          disabled={!content || !session}
          isLoading={isPostPending}
          size="sm"
        >
          댓글달기
        </Button>
      </XStack>
    </form>
  )
}
