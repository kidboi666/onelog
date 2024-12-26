import { YStack } from '@/src/components/shared/Stack'
import { Suspense } from 'react'
import Spinner from '@/src/components/shared/Spinner'
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
      <Suspense
        fallback={
          <Spinner.Container>
            <Spinner size={40} />
          </Spinner.Container>
        }
      >
        <Comments postId={postId} />
      </Suspense>
    </YStack>
    /**
     * TODO #1 무한 대댓글이 가능함 @kidboi666
     */
  )
}
