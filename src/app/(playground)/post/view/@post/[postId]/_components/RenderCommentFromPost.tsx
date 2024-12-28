import { YStack } from '@/src/components/Stack'
import Comments from '@/src/app/(playground)/(home)/_components/Comments'

interface Props {
  postId: number
}

export default function RenderCommentFromPost({ postId }: Props) {
  return (
    <YStack
      gap={4}
      className="rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray"
    >
      <Comments postId={postId} />
    </YStack>
    /**
     * TODO #1 무한 대댓글이 가능함 @kidboi666
     */
  )
}
