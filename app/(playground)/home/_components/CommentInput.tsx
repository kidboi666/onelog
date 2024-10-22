import Avatar from '@/components/shared/Avatar'
import Button from '@/components/shared/Button'
import Input from '@/components/shared/Input'
import { useInput } from '@/hooks/useInput'
import { usePostComment } from '@/services/mutates/comment/usePostComment'
import { Tables } from '@/types/supabase'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react'

interface Props {
  sentenceId: number
  commentId?: number
  me: Tables<'user_info'> | null
}

export default function CommentInput({ sentenceId, commentId, me }: Props) {
  const router = useRouter()
  const [content, onChangeContent, setContent] = useInput('')
  const { mutate: postComment, isPending: isPostPending } = usePostComment()
  const handleRouterGuard = () => {
    router.push('/auth_guard')
  }
  const handlePostComment = (e: FormEvent) => {
    e.preventDefault()
    if (me) {
      postComment(
        {
          email: me.email!,
          userName: me.user_name || '',
          userId: me.id,
          content,
          sentenceId: sentenceId,
          avatarUrl: me.avatar_url || null,
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
      className="mb-2 flex w-full gap-4"
    >
      <Avatar src={me?.avatar_url} size="sm" shadow="sm" />
      <Input
        value={content}
        onChange={onChangeContent}
        dimension="sm"
        placeholder={me ? '댓글을 달아주세요.' : '로그인을 해주세요'}
        className="w-full bg-var-lightgray dark:bg-var-dark"
      />
      <Button
        type="submit"
        disabled={!content || !me}
        isLoading={isPostPending}
        size="sm"
        className="h-full self-end"
      >
        댓글달기
      </Button>
    </form>
  )
}
