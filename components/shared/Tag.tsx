import Button from './Button'
import { List } from './List'

interface Props {
  tag: any
  index?: number
  onDelete?: (index: number) => void
}

export default function Tag({ tag, index, onDelete }: Props) {
  return (
    <List.Row>
      <Button
        variant="secondary"
        onClick={() => (onDelete ? onDelete(index!) : null)}
        className="animate-grow-up rounded-xl border-0 px-2 py-[2px] text-xs font-medium text-zinc-600 ring-1 ring-zinc-300 dark:text-zinc-200 dark:ring-zinc-600"
      >
        {tag}
      </Button>
    </List.Row>
  )
}
