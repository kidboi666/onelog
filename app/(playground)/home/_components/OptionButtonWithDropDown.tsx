import Icon from '@/components/shared/Icon'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import { MouseEvent } from 'react'
import { DropDown } from '@/components/shared/DropDown'

export default function OptionButtonWithDropDown() {
  const { close, ref, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const optionButtonRef = useOutsideClick<HTMLButtonElement>(close)

  const handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <DropDown.Root>
      <DropDown.Trigger
        targetRef={optionButtonRef}
        size="icon"
        onClick={handleButtonClick}
      >
        <Icon view="0 -960 960 960" size={18}>
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </Icon>
      </DropDown.Trigger>
      <DropDown.Content
        ref={ref}
        initStatus="closed"
        position="topLeft"
        onTransitionEnd={onTransitionEnd}
        className="p-0"
      >
        <DropDown.Button
          variant="list"
          size="sm"
          onClick={() => null}
          className="w-full gap-2"
        >
          <Icon view="0 -960 960 960" size={18}>
            <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240ZM330-120 120-330v-300l210-210h300l210 210v300L630-120H330Zm34-80h232l164-164v-232L596-760H364L200-596v232l164 164Zm116-280Z" />
          </Icon>
          신고하기
        </DropDown.Button>
      </DropDown.Content>
    </DropDown.Root>
  )
}
