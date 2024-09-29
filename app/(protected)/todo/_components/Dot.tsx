import cn from '@/lib/cn'

interface Props {
  color?: string
  isSelected: boolean
}

export function Dot({ color, isSelected }: Props) {
  return (
    <div
      className={cn(
        'relative size-2 rounded-full bg-red-500 transition',
        color === 'yellow' && 'bg-var-yellow',
        color === 'orange' && 'bg-var-orange',
        color === 'black' && 'bg-black',
        color === 'blue' && 'bg-var-blue',
        color === 'green' && 'bg-var-green',
        color === 'red' && 'bg-red-500',
        color === 'purple' && 'bg-purple-500',
        isSelected ? 'ring-8 ring-zinc-200 dark:ring-zinc-600' : '',
      )}
    ></div>
  )
}
