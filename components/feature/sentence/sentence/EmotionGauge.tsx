import { List } from '@/components/shared/List'
import cn from '@/lib/cn'
import { useTheme } from '@/store/useTheme'

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
    <div className="absolute left-0 top-0 z-10 h-px w-full">
      <List className="flex w-full justify-between">
        {emotionLevel &&
          emotionBlock!.map((shouldRender, index) => (
            <EmotionBlock key={index} color={color} isOn={!!shouldRender} />
          ))}
      </List>
    </div>
  )
}

interface EmotionBlockProps {
  isOn: boolean
  color: string
}

function EmotionBlock({ isOn, color }: EmotionBlockProps) {
  return (
    <List.Row className="flex w-full">
      <div
        className={cn(
          'h-1 w-full border-r-2 border-var-lightgray bg-zinc-300/15 dark:border-var-black dark:bg-zinc-300/25',
          isOn &&
            color === 'yellow' &&
            'bg-var-yellow/15 dark:bg-var-yellow/25',
          isOn &&
            color === 'orange' &&
            'bg-var-orange/15 dark:bg-var-orange/25',
          isOn && color === 'black' && 'bg-black/60 dark:bg-black/60',
          isOn && color === 'blue' && 'bg-var-blue/15 dark:bg-var-blue/60',
          isOn && color === 'green' && 'bg-var-green/15 dark:bg-var-green/60',
          isOn && color === 'red' && 'bg-red-500/15 dark:bg-red-500/60',
          isOn &&
            color === 'purple' &&
            'bg-purple-500/15 dark:bg-purple-500/60',
        )}
      />
    </List.Row>
  )
}
