import { List } from '@/components/shared/List'
import Tag from '@/components/shared/Tag'
import { Editor, EditorContent } from '@tiptap/react'
import { MouseEvent, Suspense, useEffect, useRef, useState } from 'react'
import Spinner from '@/components/shared/Spinner'
import { Tables } from '@/types/supabase'
import FavoriteButton from './FavoriteButton'
import AccessTypeButtonWithDropDown from './AccessTypeButtonWithDropDown'
import OptionButtonWithDropDown from './OptionButtonWithDropDown'
import CommentButton from './CommentButton'
import Comments from './Comments'
import Title from '@/components/shared/Title'

interface Props {
  tags?: string[]
  editor: Editor
  favoritedUserId?: string[]
  favoritedCount?: number
  commentCount?: number
  sentenceId: number
  sentenceTitle?: string | null
  isMyPage?: boolean
  onFavorite: (e: MouseEvent, { sentenceId }: { sentenceId: number }) => void
  onClick?: () => void
  disabled?: boolean
  me: Tables<'user_info'>
  userId: string | null
  accessType?: string | null
}

export default function SentenceContent({
  tags,
  editor,
  sentenceTitle,
  favoritedUserId,
  favoritedCount,
  commentCount,
  sentenceId,
  isMyPage,
  onFavorite,
  onClick,
  disabled = false,
  me,
  userId,
  accessType,
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
    <div
      className="flex size-full w-full cursor-pointer flex-col gap-4 rounded-md bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:shadow-lg dark:bg-var-darkgray"
      onClick={onClick}
    >
      {tags?.length! > 0 && (
        <List className="flex flex-wrap gap-2">
          {tags?.map((tag, idx) => <Tag key={idx} tag={tag} />)}
        </List>
      )}
      <div className="relative max-h-64 overflow-hidden">
        {sentenceTitle && <Title className="mb-8">{sentenceTitle}</Title>}
        <EditorContent
          innerRef={contentRef}
          editor={editor}
          className="line-clamp-6"
        />
        {showGradient && (
          <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-var-darkgray" />
        )}
      </div>
      <nav className="flex items-center justify-between">
        <FavoriteButton
          favoritedUserId={favoritedUserId}
          favoritedCount={favoritedCount}
          sentenceId={sentenceId}
          onFavorite={onFavorite}
          userId={userId}
        />
        <CommentButton
          disabled={disabled}
          showComment={showComment}
          commentCount={commentCount!}
          onShowComment={handleShowComment}
        />
        <AccessTypeButtonWithDropDown accessType={accessType} />
        <OptionButtonWithDropDown />
      </nav>
      {showComment && !isMyPage && (
        <Suspense fallback={<Spinner size={40} />}>
          <Comments sentenceId={sentenceId} me={me} />
        </Suspense>
      )}
    </div>
  )
}
