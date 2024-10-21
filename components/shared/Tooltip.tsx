import cn from '@/lib/cn'
import Text from './Text'

interface Props {
  text: string
  position?: 'top' | 'bottom' | 'left' | 'right'
}

export default function ToolTip({ text, position = 'bottom' }: Props) {
  return (
    <div className="fixed left-4 top-4 z-[9999]">
      <div className="relative size-fit rounded-md bg-black px-2 py-2 shadow-md">
        <div
          className={cn(
            'absolute size-2 rotate-45 bg-black',
            position === 'top' ? '-top-1 left-1/2 -translate-x-1/2' : '',
            position === 'bottom' ? '-bottom-1 left-1/2 -translate-x-1/2' : '',
            position === 'left' ? '-left-1 top-1/2 -translate-y-1/2' : '',
            position === 'right' ? '-right-1 top-1/2 -translate-y-1/2' : '',
          )}
        />
        <Text>{text}</Text>
      </div>
    </div>
  )
}
