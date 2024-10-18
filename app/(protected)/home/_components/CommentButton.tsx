import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import cn from '@/lib/cn'
import { MouseEvent } from 'react'

interface Props {
  onShowComment: (e: MouseEvent) => void
  commentCount?: number
  showComment?: boolean
  disabled?: boolean
}

export default function CommentButton({
  onShowComment,
  commentCount,
  showComment,
  disabled,
}: Props) {
  return (
    <Button
      variant="icon"
      size="icon"
      disabled={disabled}
      onClick={onShowComment}
      className={cn(
        'flex gap-2 border-none text-xs font-light transition hover:text-blue-400 dark:hover:text-blue-400',
        showComment ? 'text-blue-400 dark:text-blue-400' : '',
      )}
    >
      <Icon size={16} view={150}>
        <g id="income">
          <path d="M33,105h21v15l18-15h45c4.97,0,9-4.03,9-9v-57c0-4.97-4.03-9-9-9H33c-4.97,0-9,4.03-9,9v57c0,4.97,4.03,9,9,9Z" />
          <line x1="51" y1="57" x2="99" y2="57" />
          <line x1="51" y1="78" x2="99" y2="78" />
        </g>
      </Icon>
      {commentCount ?? 0}
    </Button>
  )
}
