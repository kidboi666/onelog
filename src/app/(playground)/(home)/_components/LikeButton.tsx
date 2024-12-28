import Button from '@/src/components/Button'
import Icon from '@/src/components/Icon'
import ToolTip from '@/src/components/Tooltip'
import useToggle from '@/src/hooks/useToggle'
import cn from '@/src/lib/cn'
import { MouseEvent } from 'react'
import useLikeMutates from '@/src/hooks/mutates/useLikeMutates'
import { routes } from '@/src/routes'
import useMeQueries from '@/src/hooks/queries/useMeQueries'
import { useRouter } from 'next/navigation'

interface Props {
  viewToolTip?: boolean
  isSide?: boolean
  postId: number
  likeCount: number
}

export default function LikeButton({
  viewToolTip,
  isSide,
  likeCount,
  postId,
}: Props) {
  const router = useRouter()
  const { isOpen: isHover, open: hover, close: leave } = useToggle()
  const { me } = useMeQueries()
  const { isLike, onLikePost } = useLikeMutates({ me, postId })

  const handleFavoritePost = (e: MouseEvent): void => {
    e.stopPropagation()
    me ? onLikePost(e) : router.push(routes.modal.auth.guard, { scroll: false })
  }

  return (
    <div
      onMouseEnter={hover}
      onMouseLeave={leave}
      className="relative size-fit"
    >
      <Button
        variant="icon"
        size={isSide ? 'md' : 'icon'}
        onClick={handleFavoritePost}
        className={cn(
          'flex border-none text-xs font-light hover:text-red-500 dark:hover:text-red-500',
          isSide ? 'max-lg:flex-col' : 'gap-1',
          me?.id && isLike && 'text-red-500 dark:text-red-500',
        )}
      >
        <Icon size={isSide ? 24 : 18} view={150}>
          <path
            id="like"
            d="M129,57.86c0-17.04-13.6-30.86-30.38-30.86-9.55,0-18.06,6.72-23.62,13.71-5.57-7-14.08-13.71-23.62-13.71-16.78,0-30.38,13.82-30.38,30.86,0,6.34,1.88,12.24,5.12,17.14.71,1.08,7.48,9.38,8.38,10.28,9.41,9.37,40.5,37.71,40.5,37.71,0,0,35.62-33.78,46.54-44.93,4.98-5.09,7.46-12.47,7.46-20.21Z"
          />
        </Icon>
        {likeCount ?? 0}
      </Button>
      {viewToolTip && <ToolTip isHover={isHover} text="좋아요" />}
    </div>
  )
}
