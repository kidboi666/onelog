import Tag from '@/components/shared/Tag'
import { Editor, EditorContent } from '@tiptap/react'
import { MouseEvent, useEffect, useRef, useState } from 'react'
import FavoriteButton from './FavoriteButton'
import AccessTypeButtonWithDropDown from './AccessTypeButtonWithDropDown'
import CommentButton from './CommentButton'
import Title from '@/components/shared/Title'
import { XStack, YStack, ZStack } from '@/components/shared/Stack'
import { Container } from '@/components/shared/Container'
import ReportButton from './ReportButton'

interface Props {
  tags?: string[]
  editor: Editor
  isLiked: boolean | null
  favoritedCount?: number
  commentCount?: number
  sentenceTitle?: string | null
  isMyPage?: boolean
  onFavorite: (e: MouseEvent) => void
  onClick?: () => void
  disabled?: boolean
  meId?: string | null
  accessType?: string | null
  sentenceId?: number
  sentenceUserId?: string
}

export default function SentenceContent({
  tags,
  editor,
  sentenceTitle,
  isLiked,
  favoritedCount,
  commentCount,
  onFavorite,
  onClick,
  disabled = false,
  meId,
  accessType,
  sentenceId,
}: Props) {
  const [showComment, setShowComment] = useState(false)
  const [showGradient, setShowGradient] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)

  const handleShowComment = () => {
    setShowComment((prev) => !prev)
  }

  useEffect(() => {
    if (contentRef.current) {
      const contentHeight = contentRef.current.scrollHeight
      const maxHeight = 256
      setShowGradient(contentHeight > maxHeight)
    }
  }, [editor])

  return (
    <Container
      onClick={onClick}
      className="size-full w-full cursor-pointer rounded-md bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:shadow-lg dark:bg-var-darkgray"
    >
      <YStack gap={4}>
        {tags?.length! > 0 && (
          <XStack className="flex-wrap">
            {tags?.map((tag, idx) => <Tag key={idx} tag={tag} />)}
          </XStack>
        )}
        <ZStack direction="col" className="max-h-64 overflow-hidden">
          {sentenceTitle && <Title>{sentenceTitle}</Title>}
          <EditorContent
            innerRef={contentRef}
            editor={editor}
            className="line-clamp-6"
          />
          {showGradient && (
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-var-darkgray" />
          )}
        </ZStack>
        <XStack as="nav" className="items-center justify-between">
          <FavoriteButton
            isLiked={isLiked}
            favoritedCount={favoritedCount}
            onFavorite={onFavorite}
            meId={meId}
            viewToolTip
          />
          <CommentButton
            disabled={disabled}
            showComment={showComment}
            commentCount={commentCount!}
            onShowComment={handleShowComment}
            viewToolTip
          />
          <AccessTypeButtonWithDropDown accessType={accessType} viewToolTip />
          <ReportButton sentenceId={sentenceId} viewToolTip />
        </XStack>
      </YStack>
    </Container>
  )
}
