import cn from '@/src/lib/cn'
import { useTheme } from '@/src/store/hooks/useTheme'
import { ColorScheme, EmotionLevel } from '@/src/types/enums/index'

interface Props {
  emotionLevel: EmotionLevel | null
  className?: string
  size?: number
  onClick?: (emotion: EmotionLevel | null) => void
}

export default function EmotionGauge({
  emotionLevel,
  className,
  onClick,
}: Props) {
  const { color } = useTheme()

  let emotionBlock = [0, 0, 0, 0, 0]

  switch (emotionLevel) {
    case EmotionLevel['0%']:
      emotionBlock = [1, 0, 0, 0, 0]
      break
    case EmotionLevel['25%']:
      emotionBlock = [1, 1, 0, 0, 0]
      break
    case EmotionLevel['50%']:
      emotionBlock = [1, 1, 1, 0, 0]
      break
    case EmotionLevel['75%']:
      emotionBlock = [1, 1, 1, 1, 0]
      break
    case EmotionLevel['100%']:
      emotionBlock = [1, 1, 1, 1, 1]
      break
    default:
      break
  }

  return (
    emotionLevel && (
      <div className={cn('flex items-end', className)}>
        {emotionBlock!.map((shouldRender, index) => (
          <RenderEmotionBlock
            key={index}
            index={index}
            onClick={onClick}
            shouldRender={shouldRender}
            color={color}
          />
        ))}
      </div>
    )
  )
}

interface RenderEmotionBlockProps {
  shouldRender: number
  color: ColorScheme
  index: number
  onClick?: (emotion: EmotionLevel | null) => void
}

function RenderEmotionBlock({
  shouldRender,
  color,
  index,
  onClick,
}: RenderEmotionBlockProps) {
  let currentEmotion: EmotionLevel
  let blockOpacity: string
  let sizeString: string
  switch (index) {
    case 0:
      currentEmotion = EmotionLevel['0%']
      break
    case 1:
      currentEmotion = EmotionLevel['25%']
      break
    case 2:
      currentEmotion = EmotionLevel['50%']
      break
    case 3:
      currentEmotion = EmotionLevel['75%']
      break
    case 4:
      currentEmotion = EmotionLevel['100%']
      break
    default:
      break
  }
  switch (index) {
    case 0:
      blockOpacity = `opacity-20`
      break
    case 1:
      blockOpacity = `opacity-40`
      sizeString = shouldRender ? 'h-[12px]' : ''
      currentEmotion = EmotionLevel['25%']
      break
    case 2:
      blockOpacity = 'opacity-60'
      sizeString = shouldRender ? 'h-[16px]' : ''
      currentEmotion = EmotionLevel['50%']
      break
    case 3:
      blockOpacity = 'opacity-80'
      sizeString = shouldRender ? 'h-[20px]' : ''
      currentEmotion = EmotionLevel['75%']
      break
    case 4:
      blockOpacity = 'opacity-100'
      sizeString = shouldRender ? 'h-[24px]' : ''
      currentEmotion = EmotionLevel['100%']
      break
    default:
      break
  }
  return (
    <div
      onClick={() => onClick && onClick(currentEmotion)}
      className="flex h-full cursor-pointer items-end overflow-hidden"
    >
      <div
        className={cn(
          'size-full h-2 rounded-full bg-zinc-300/35 p-1 shadow-sm transition-all dark:bg-zinc-300/15',
          sizeString!,
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
      <div className="w-px" />
    </div>
  )
}
