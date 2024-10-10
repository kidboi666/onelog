import { List } from '@/components/shared/List'
import cn from '@/lib/cn'
import { useTheme } from '@/store/useTheme'
import EmotionDropDown from '../../dropdown/EmotionDropDown'
import useStateChange from '@/hooks/useStateChange'
import Button from '@/components/shared/Button'
import { TColor } from '@/types/theme'

interface Props {
  emotionLevel?: string
}

export default function EmotionGauge({ emotionLevel }: Props) {
  const { color } = useTheme()
  const { open, close, onClick, ref, onTransitionEnd } =
    useStateChange<HTMLDivElement>()

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
    <List
      onMouseEnter={open}
      onMouseLeave={close}
      className="relative flex flex-1 items-end justify-between gap-px"
    >
      <Button variant="icon" size="none" onClick={onClick} className="gap-px">
        {emotionLevel &&
          emotionBlock!.map((shouldRender, index) => (
            <EmotionBlock
              key={index}
              shouldRender={shouldRender}
              color={color}
            />
          ))}
      </Button>
      <EmotionDropDown
        targetRef={ref}
        onTransitionEnd={onTransitionEnd}
        emotionLevel={emotionLevel}
      />
    </List>
  )
}

interface EmotionBlockProps {
  shouldRender: number
  color: TColor
}

function EmotionBlock({ shouldRender, color }: EmotionBlockProps) {
  return (
    <List.Row
      className={cn(
        'size-2 rounded-full bg-zinc-300/45 shadow-sm dark:bg-zinc-300/25',
        shouldRender &&
          color === 'yellow' &&
          'bg-var-yellow/45 dark:bg-var-yellow/45',
        shouldRender &&
          color === 'orange' &&
          'bg-var-orange/45 dark:bg-var-orange/45',
        shouldRender && color === 'black' && 'bg-black/60 dark:bg-white/60',
        shouldRender &&
          color === 'blue' &&
          'bg-var-blue/45 dark:bg-var-blue/45',
        shouldRender &&
          color === 'green' &&
          'bg-var-green/45 dark:bg-var-green/45',
      )}
    ></List.Row>
  )
}
