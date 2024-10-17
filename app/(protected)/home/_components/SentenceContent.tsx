import { List } from '@/components/shared/List'
import Tag from '@/components/shared/Tag'
import { Editor, EditorContent } from '@tiptap/react'
import { MouseEvent, Suspense, useState } from 'react'
import Spinner from '@/components/shared/Spinner'
import { Tables } from '@/types/supabase'
import { usePathname } from 'next/navigation'
import FavoriteButton from './FavoriteButton'
import AccessTypeButtonWithDropDown from './AccessTypeButtonWithDropDown'
import OptionButtonWithDropDown from './OptionButtonWithDropDown'
import CommentButton from './CommentButton'
import Comments from './Comments'

interface Props {
  tags?: string[]
  editor: Editor
  favoritedUserId?: string[]
  favoritedCount?: number
  commentCount?: number
  sentenceId: number
  isMyPage?: boolean
  onFavorite: (e: MouseEvent, { sentenceId }: { sentenceId: number }) => void
  onClick?: () => void
  disabled?: boolean
  me: Tables<'user_info'>
  userId: string
  accessType?: string | null
}

export default function SentenceContent({
  tags,
  editor,
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
  const pathname = usePathname()
  const [showComment, setShowComment] = useState(false)

  const handleShowComment = (): void => {
    if (pathname.includes('home')) {
      return
    } else {
      setShowComment((prev) => !prev)
    }
  }

  return (
    <div
      className="flex size-full w-full cursor-pointer flex-col gap-4 overflow-y-auto rounded-md bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:shadow-lg dark:bg-var-darkgray"
      onClick={onClick}
    >
      {tags?.length! > 0 && (
        <List className="flex flex-wrap gap-2">
          {tags?.map((tag, idx) => <Tag key={idx} tag={tag} />)}
        </List>
      )}
      <EditorContent editor={editor} />
      {isMyPage ? null : (
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
      )}
      {showComment && !isMyPage && (
        <Suspense fallback={<Spinner size={40} />}>
          <Comments sentenceId={sentenceId} me={me} />
        </Suspense>
      )}
    </div>
  )
}
