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
import EmotionGauge from './EmotionGauge'

interface Props {
  tags?: string[]
  editor: Editor
  emotionLevel?: string
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
}

export default function SentenceContent({
  tags,
  editor,
  emotionLevel,
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
      className="flex size-full w-full cursor-pointer flex-col gap-4 overflow-hidden overflow-y-auto rounded-md bg-white p-4 shadow-sm transition duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg dark:bg-var-darkgray"
      onClick={onClick}
    >
      <EmotionGauge emotionLevel={emotionLevel} />
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
      {showComment && !isMyPage && (
        <Suspense fallback={<Spinner size={40} />}>
          <Comments sentenceId={sentenceId} me={me} />
        </Suspense>
      )}
    </div>
  )
}
