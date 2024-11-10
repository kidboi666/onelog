import { DropDown } from '@/components/shared/DropDown'
import { YStack } from '@/components/shared/Stack'
import Title from '@/components/shared/Title'
import { MBTI, TMBTI } from '../_constants/mbti'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import Icon from '@/components/shared/Icon'

interface Props {
  mbti?: TMBTI
  setMbti: (mbti: TMBTI) => void
}

export default function MBTISection({ mbti, setMbti }: Props) {
  const { ref, close, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  const handleListClick = (mbti: (typeof MBTI)[number]) => {
    setMbti(mbti)
    close()
  }

  return (
    <YStack gap={8}>
      <Title>MBTI</Title>
      <DropDown.Root>
        <DropDown.Trigger
          variant="secondary"
          targetRef={buttonRef}
          onClick={onClick}
        >
          <DropDown.Text>{mbti || 'MBTI 선택'}</DropDown.Text>
          <Icon view="0 -960 960 960" size={18}>
            <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
          </Icon>
        </DropDown.Trigger>
        <DropDown.Content
          initStatus="closed"
          position="topRight"
          onTransitionEnd={onTransitionEnd}
          ref={ref}
        >
          {MBTI.map((mbti) => (
            <DropDown.Button
              onClick={() => handleListClick(mbti)}
              key={mbti}
              variant="list"
            >
              {mbti}
            </DropDown.Button>
          ))}
        </DropDown.Content>
      </DropDown.Root>
    </YStack>
  )
}
