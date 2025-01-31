import { FormEvent, useEffect } from 'react'
import useUpdateComment from '@/src/services/mutates/comment/useUpdateComment'
import { IComment } from '@/src/types/entities/comment'
import useInput from '@/src/hooks/useInput'
import Button from '@/src/components/Button'
import Input from '@/src/components/Input'
import { XStack, YStack } from '@/src/components/Stack'

interface Props {
  comment: IComment
  onModify: () => void
}

export default function CommentModifyInput({ comment, onModify }: Props) {
  const [content, onChangeContent, setContent] = useInput<string>('')
  const { mutate: updateComment, isPending } = useUpdateComment()

  const handlePostComment = (e: FormEvent) => {
    const { postId, commentId } = comment
    e.preventDefault()
    updateComment(
      {
        content,
        postId,
        commentId,
      },
      {
        onSuccess: () => {
          onModify()
        },
      },
    )
  }

  useEffect(() => {
    setContent(comment.content)
  }, [comment.content])

  return (
    <form onSubmit={handlePostComment}>
      <YStack>
        <Input
          value={content}
          onChange={onChangeContent}
          dimension="xs"
          className="w-full bg-var-lightgray dark:bg-var-dark"
        />
        <XStack>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            disabled={comment.content === content}
            isLoading={isPending}
          >
            수정하기
          </Button>
          <Button variant="secondary" size="sm" onClick={onModify}>
            돌아가기
          </Button>
        </XStack>
      </YStack>
    </form>
  )
}
