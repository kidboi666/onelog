import { cva } from 'class-variance-authority'
import Button from './Button'
import { List } from './List'
import cn from '@/lib/cn'

interface Props {
  border: 'border' | 'none'
  background: 'background' | 'none'
  tag: any
  index?: number
  onDelete?: (index: number) => void
}

const TAG_VARIANTS = cva(
  'animate-grow-up rounded-xl border-0 px-2 py-[2px] text-xs font-medium text-zinc-600 shadow-sm ring-0 dark:text-zinc-200',
  {
    variants: {
      border: {
        border: 'ring-1 ring-zinc-300 dark:ring-zinc-600',
        none: '',
      },
      background: {
        background: 'bg-white dark:bg-var-dark',
        none: '',
      },
    },
  },
)

export default function Tag({
  border = 'border',
  background = 'none',
  tag,
  index,
  onDelete,
}: Props) {
  return (
    <List.Row>
      <Button
        variant="secondary"
        onClick={() => (onDelete ? onDelete(index!) : null)}
        className={cn(TAG_VARIANTS({ border, background }))}
      >
        {tag}
      </Button>
    </List.Row>
  )
}
