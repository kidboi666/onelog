import { List } from '@/components/shared/List'
import Tag from '@/components/shared/Tag'
import { Editor, EditorContent } from '@tiptap/react'
import { MouseEvent, Suspense, useState } from 'react'
import Comments from '../comment/Comments'
import Spinner from '@/components/shared/Spinner'
import FavoriteButton from '../button/FavoriteButton'
import CommentButton from '../button/CommentButton'
import { Tables } from '@/types/supabase'
import { usePathname } from 'next/navigation'

interface Props {
  tags?: string[]
  editor: Editor
  favoritedUserId?: string[]
  favoritedCount?: number
  commentCount?: number
  sentenceId: number
  isMyPage?: boolean
  onFavorite: (e: MouseEvent, sentenceId: number) => void
  disabled?: boolean
  me: Tables<'user_info'>
  userId: string
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
  disabled = false,
  me,
  userId,
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
    <>
      <div className="flex size-full flex-col gap-4 overflow-y-auto rounded-md bg-white p-4 shadow-sm dark:bg-var-darkgray">
        {tags?.length! > 0 && (
          <List className="flex flex-wrap gap-2">
            {tags?.map((tag, idx) => <Tag key={idx} tag={tag} />)}
          </List>
        )}
        <EditorContent editor={editor} />
        {isMyPage ? null : (
          <div className="flex flex-1">
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
          </div>
        )}
      </div>
      {showComment && !isMyPage && (
        <Suspense fallback={<Spinner size={40} />}>
          <Comments sentenceId={sentenceId} me={me} />
        </Suspense>
      )}
    </>
  )
}
