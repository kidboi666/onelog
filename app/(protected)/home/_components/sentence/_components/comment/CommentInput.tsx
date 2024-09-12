import Avatar from '@/components/feature/user/Avatar'
import Button from '@/components/shared/Button'
import FormContainer from '@/components/shared/FormContainer'
import Input from '@/components/shared/Input'
import { useInput } from '@/hooks/useInput'
import { getQueryClient } from '@/lib/tanstack/get-query-client'
import { usePostComment } from '@/services/mutates/comment/usePostComment'
import { Tables } from '@/types/supabase'
import { FormEvent } from 'react'

interface Props {
  sentenceId?: number
  commentId?: number
}

export default function CommentInput({ sentenceId, commentId }: Props) {
  const [content, onChangeContent] = useInput('')
  const me = getQueryClient().getQueryData<Tables<'user_info'>>(['me', 'info'])
  const { mutate: postComment } = usePostComment()

  const handlePostComment = (e: FormEvent) => {
    e.preventDefault()
    postComment({
      email: me!.email!,
      userName: me!.user_name!,
      userId: me!.id!,
      content,
      sentenceId: sentenceId || null,
      avatarUrl: me!.avatar_url || null,
      commentId: commentId || null,
    })
  }

  return (
    <FormContainer onSubmit={handlePostComment} className="mb-8 flex gap-4">
      <Avatar src={me?.avatar_url} size="sm" />
      <Input
        value={content}
        onChange={onChangeContent}
        dimension="sm"
        placeholder="댓글을 달아주세요."
        className="flex-1"
      />
      <Button disabled={!content} className="self-end">
        댓글 달기
      </Button>
    </FormContainer>
  )
}
