import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import cn from '@/lib/cn'
import { useRouter } from 'next/navigation'
import { MouseEvent } from 'react'

interface Props {
  sentenceId: number
  commentId?: number
  favoritedCount?: number | null
  favoritedUserId?: string[] | null
  onFavorite: (
    e: MouseEvent,
    { commentId, sentenceId }: { commentId?: number; sentenceId: number },
  ) => void
  userId: string | null
}

export default function FavoriteButton({
  sentenceId,
  commentId,
  favoritedCount,
  favoritedUserId,
  onFavorite,
  userId,
}: Props) {
  const router = useRouter()

  const handleFavorite = (e: MouseEvent) => {
    userId
      ? onFavorite(e, { commentId, sentenceId })
      : router.push('/auth_guard', { scroll: false })
  }
  return (
    <Button
      variant="icon"
      size="icon"
      onClick={handleFavorite}
      className={cn(
        'flex gap-2 border-none text-xs font-light hover:text-red-500 dark:hover:text-red-500',
        userId &&
          favoritedUserId?.includes(userId) &&
          'text-red-500 dark:text-red-500',
      )}
    >
      <Icon size={16} view={150}>
        <path
          id="like"
          d="M129,57.86c0-17.04-13.6-30.86-30.38-30.86-9.55,0-18.06,6.72-23.62,13.71-5.57-7-14.08-13.71-23.62-13.71-16.78,0-30.38,13.82-30.38,30.86,0,6.34,1.88,12.24,5.12,17.14.71,1.08,7.48,9.38,8.38,10.28,9.41,9.37,40.5,37.71,40.5,37.71,0,0,35.62-33.78,46.54-44.93,4.98-5.09,7.46-12.47,7.46-20.21Z"
        />
      </Icon>
      {favoritedCount ?? 0}
    </Button>
  )
}
