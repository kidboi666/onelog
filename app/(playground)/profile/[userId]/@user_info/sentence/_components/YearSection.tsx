import Button from '@/components/shared/Button'
import { DropDown } from '@/components/shared/DropDown'
import Icon from '@/components/shared/Icon'
import useOutsideClick from '@/hooks/useOutsideClick'
import useDataDrivenAnimation from '@/hooks/useStateChange'

interface Props {
  yearList: number[]
  selectedYear: number
  onSelect: (year: number) => void
}

export default function YearSection({
  yearList,
  selectedYear,
  onSelect,
}: Props) {
  const {
    onClick: onClickButton,
    close,
    onTransitionEnd,
    ref,
  } = useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  return (
    <DropDown.Root>
      <DropDown.Trigger
        onClick={onClickButton}
        variant="secondary"
        targetRef={buttonRef}
        size="sm"
      >
        {selectedYear}
        <Icon view="0 -960 960 960" size={18}>
          <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
        </Icon>
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        position="bottomLeft"
        onTransitionEnd={onTransitionEnd}
        initStatus="closed"
      >
        {yearList.map((year) => (
          <Button
            key={year}
            onClick={() => onSelect(year)}
            variant="list"
            size="sm"
          >
            {year}
          </Button>
        ))}
      </DropDown.Content>
    </DropDown.Root>
  )
}
