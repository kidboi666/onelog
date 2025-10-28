import useOutsideClick from '@/src/hooks/useOutsideClick';
import useDataDrivenAnimation from '@/src/hooks/useStateChange';
import { DropDown } from '@/src/components/DropDown';
import Icon from '@/src/components/Icon';
import { YStack } from '@/src/components/Stack';
import Title from '@/src/components/Title';
import { MBTI, TMBTI } from '../_constants/mbti';


interface Props {
  mbti?: TMBTI
  setMbti: (mbti: TMBTI) => void
}

export default function MBTISection({ mbti, setMbti }: Props) {
  const { ref, close, onClick, onTransitionEnd } = useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  const handleListClick = (mbti: (typeof MBTI)[number]) => {
    setMbti(mbti)
    void close()
  }

  return (
    <YStack gap={4}>
      <Title>MBTI</Title>
      <DropDown.Root>
        <DropDown.Trigger variant="secondary" targetRef={buttonRef} onClick={onClick}>
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
          {MBTI.map((v) => (
            <DropDown.Button
              onClick={() => handleListClick(v)}
              key={v}
              variant="list"
              className="gap-2"
            >
              {v}
              {v === mbti && (
                <Icon view="0 -960 960 960" size={14}>
                  <path d="M382-240 154-468l57-57 171 171 367-367 57 57-424 424Z" />
                </Icon>
              )}
            </DropDown.Button>
          ))}
        </DropDown.Content>
      </DropDown.Root>
    </YStack>
  )
}
