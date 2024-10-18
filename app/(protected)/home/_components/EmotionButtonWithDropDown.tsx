import { DropDown } from '@/components/shared/DropDown'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import EmotionGauge from './EmotionGauge'
import Text from '@/components/shared/Text'

interface Props {
  emotionLevel: string
}

export default function EmotionButtonWithDropDown({ emotionLevel }: Props) {
  const { close, ref, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)
  let emotionState: string

  switch (emotionLevel) {
    case '0%':
      emotionState = '매우 나쁨'
      break
    case '25%':
      emotionState = '나쁨'
      break
    case '50%':
      emotionState = '보통'
      break
    case '75%':
      emotionState = '좋음'
      break
    case '100%':
      emotionState = '매우 좋음'
      break
    default:
      break
  }

  return (
    <DropDown.Root>
      <DropDown.Trigger
        targetRef={buttonRef}
        size="none"
        onClick={onClick}
        className="group gap-px bg-white p-2 shadow-sm dark:bg-var-darkgray"
      >
        {emotionLevel && <EmotionGauge emotionLevel={emotionLevel} />}
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        position="bottomLeft"
        onTransitionEnd={onTransitionEnd}
        className="p-2"
      >
        <Text size="sm">감정 상태 : {emotionState!}</Text>
      </DropDown.Content>
    </DropDown.Root>
  )
}
