import Avatar from '@/components/feature/user/Avatar'
import Button from '@/components/shared/Button'
import FormContainer from '@/components/shared/FormContainer'
import Input from '@/components/shared/Input'
import { useInput } from '@/hooks/useInput'
import { supabase } from '@/lib/supabase/client'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { usePostComment } from '@/services/mutates/comment/usePostComment'
import { meQuery } from '@/services/queries/auth/meQuery'
import { ISessionInfo } from '@/types/auth'
import { useSuspenseQuery } from '@tanstack/react-query'
import { FormEvent } from 'react'

interface Props {
  sentenceId: number
  commentId?: number
}

export default function CommentInput({ sentenceId, commentId }: Props) {
  const [content, onChangeContent, setContent] = useInput('')
  const cachedMe = getQueryClient().getQueryData<ISessionInfo>([
    'me',
    'session',
  ])
  const { data: me } = useSuspenseQuery(
    meQuery.getUserInfo(supabase, cachedMe!.userId),
  )
  const { mutate: postComment, isPending: isPostPending } = usePostComment()

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault()
    postComment(
      {
        email: me!.email!,
        userName: me!.user_name!,
        userId: me!.id!,
        content,
        sentenceId: sentenceId,
        avatarUrl: me!.avatar_url || null,
        commentId: commentId || null,
      },
      {
        onSuccess: () => {
          setContent('')
        },
      },
    )
  }

  return (
    <FormContainer
      onSubmit={handlePostComment}
      className="mb-8 flex w-full gap-4"
    >
      <Avatar src={me?.avatar_url} size="sm" shadow="sm" />
      <Input
        value={content}
        onChange={onChangeContent}
        dimension="sm"
        placeholder="댓글을 달아주세요."
        className="w-full"
      />
      <Button
        disabled={!content}
        isLoading={isPostPending}
        className="h-full self-end text-nowrap"
      >
        댓글달기
      </Button>
    </FormContainer>
  )
}
