import { Editor, EditorContent } from '@tiptap/react'
import { useEffect, useRef, useState } from 'react'
import { Access } from '@/src/types/enums/index'
import { XStack, YStack, ZStack } from '@/src/components/Stack'
import Tag from '@/src/components/Tag'
import Title from '@/src/components/Title'
import AccessTypeButtonWithDropDown from '@/src/app/(playground)/(home)/_components/AccessTypeButtonWithDropDown'
import CommentButton from '@/src/app/(playground)/(home)/_components/CommentButton'
import LikeButton from '@/src/app/(playground)/(home)/_components/LikeButton'
import ReportButton from '@/src/app/(playground)/(home)/_components/ReportButton'

interface Props {
  tags?: string[]
  editor: Editor
  postTitle?: string | null
  onClick?: () => void
  disabled?: boolean
  likeCount: number
  isLike: boolean
  commentCount: number
  accessType: Access
  postId: number
}

export default function PostCardContent({
  tags,
  editor,
  postTitle,
  onClick,
  disabled = false,
  likeCount,
  isLike,
  commentCount,
  accessType,
  postId,
}: Props) {
  const [showGradient, setShowGradient] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      const maxHeight = 256
      setShowGradient(contentHeight > maxHeight)
    }
  }, [editor])

  return (
    <div
      onClick={onClick}
      className="size-full w-full cursor-pointer rounded-md bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:shadow-lg dark:bg-var-darkgray"
    >
      <YStack gap={4}>
        <ZStack direction="col" className="max-h-64 overflow-hidden">
          {postTitle && <Title>{postTitle}</Title>}
          <EditorContent
            innerRef={contentRef}
            editor={editor}
            className="line-clamp-6"
          />
          {showGradient && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-var-darkgray" />
          )}
        </ZStack>
        {tags?.length! > 0 && (
          <XStack className="flex-wrap">
            {tags?.map((tag, idx) => <Tag key={idx} tag={tag} />)}
          </XStack>
        )}
        <XStack as="nav" className="items-center justify-between">
          <LikeButton
            likeCount={likeCount}
            isLike={isLike}
            postId={postId}
            viewToolTip
          />
          <CommentButton
            commentCount={commentCount}
            disabled={disabled}
            viewToolTip
          />
          <AccessTypeButtonWithDropDown accessType={accessType} viewToolTip />
          <ReportButton postId={postId} viewToolTip />
        </XStack>
      </YStack>
    </div>
  )
}
