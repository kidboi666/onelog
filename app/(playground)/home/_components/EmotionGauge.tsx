import cn from '@/lib/cn'
import { useTheme } from '@/store/useTheme'
import { TColor } from '@/types/theme'

interface Props {
  emotionLevel?: string
  className?: string
  size?: number
}

export default function EmotionGauge({ emotionLevel, className }: Props) {
  const { color } = useTheme()

  let emotionBlock = [0, 0, 0, 0, 0]
  const [emotion] = emotionLevel?.split('%') || []

  switch (emotion) {
    case '0':
      emotionBlock = [1, 0, 0, 0, 0]
      break
    case '25':
      emotionBlock = [1, 1, 0, 0, 0]
      break
    case '50':
      emotionBlock = [1, 1, 1, 0, 0]
      break
    case '75':
      emotionBlock = [1, 1, 1, 1, 0]
      break
    case '100':
      emotionBlock = [1, 1, 1, 1, 1]
      break
    default:
      break
  }

  return (
    emotionLevel && (
      <div className={cn('flex items-end gap-1', className)}>
        {emotionBlock!.map((shouldRender, index) => (
          <EmotionBlock
            key={index}
            index={index}
            shouldRender={shouldRender}
            color={color}
          />
        ))}
      </div>
    )
  )
}

interface EmotionBlockProps {
  shouldRender: number
  color: TColor
  index: number
}

function EmotionBlock({ shouldRender, color, index }: EmotionBlockProps) {
  let blockOpacity: string
  let sizeString: string
  switch (index) {
    case 0:
      blockOpacity = `opacity-20`
      break
    case 1:
      blockOpacity = `opacity-40`
      sizeString = shouldRender ? 'h-[12px]' : ''
      break
    case 2:
      blockOpacity = 'opacity-60'
      sizeString = shouldRender ? 'h-[16px]' : ''
      break
    case 3:
      blockOpacity = 'opacity-80'
      sizeString = shouldRender ? 'h-[20px]' : ''
      break
    case 4:
      blockOpacity = 'opacity-100'
      sizeString = shouldRender ? 'h-[24px]' : ''
      break
    default:
      break
  }
  return (
    <div
      className={cn(
        'size-2 overflow-hidden rounded-full bg-zinc-300/35 shadow-sm transition-all dark:bg-zinc-300/15',
        sizeString!,
      )}
    >
      <div
        className={cn(
          'size-full',
          blockOpacity!,
          shouldRender &&
            color === 'yellow' &&
            'bg-var-yellow dark:bg-var-yellow',
          shouldRender &&
            color === 'orange' &&
            'bg-var-orange dark:bg-var-orange',
          shouldRender && color === 'black' && 'bg-black/60 dark:bg-white/60',
          shouldRender && color === 'blue' && 'bg-var-blue dark:bg-var-blue',
          shouldRender && color === 'green' && 'bg-var-green dark:bg-var-green',
        )}
      />
    </div>
  )
}
