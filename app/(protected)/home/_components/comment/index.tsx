import Button from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import Input from '@/components/shared/Input'
import Line from '@/components/shared/Line'
import Title from '@/components/shared/Title'
import { useInput } from '@/hooks/useInput'
import CommentItem from './CommentItem'

export default function CommentContainer() {
  const [content, onChangeContent] = useInput('')

  return (
    <>
      <Container className="flex w-full flex-col gap-4">
        <Title>달린 댓글 0개</Title>
        <Input value={content} onChange={onChangeContent} dimension="md" />
        <Button disabled={!content} className="self-end">
          댓글 달기
        </Button>
        <CommentItem 대댓글 />
        <CommentItem />
      </Container>
      <Line />
    </>
  )
}
