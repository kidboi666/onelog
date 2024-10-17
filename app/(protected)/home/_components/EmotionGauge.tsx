import cn from '@/lib/cn'
import { useTheme } from '@/store/useTheme'
import { TColor } from '@/types/theme'

interface Props {
  emotionLevel?: string
}

export default function EmotionGauge({ emotionLevel }: Props) {
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
    emotionLevel &&
    emotionBlock!.map((shouldRender, index) => (
      <EmotionBlock
        key={index}
        index={index}
        shouldRender={shouldRender}
        color={color}
      />
    ))
  )
}

interface EmotionBlockProps {
  shouldRender: number
  color: TColor
  index: number
}

function EmotionBlock({ shouldRender, color, index }: EmotionBlockProps) {
  let blockOpacity: string
  switch (index) {
    case 0:
      blockOpacity = 'opacity-20'
      break
    case 1:
      blockOpacity = 'opacity-40'
      break
    case 2:
      blockOpacity = 'opacity-60'
      break
    case 3:
      blockOpacity = 'opacity-80'
      break
    case 4:
      blockOpacity = 'opacity-100'
      break
    default:
      break
  }
  return (
    <div
      className={cn(
        'size-2 overflow-hidden rounded-full bg-zinc-300/35 shadow-sm dark:bg-zinc-300/15',
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
