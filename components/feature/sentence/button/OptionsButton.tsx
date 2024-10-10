import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import { List } from '@/components/shared/List'
import SentenceOptionsDropDown from '../dropdown/SentenceOptionsDropDown'
import useStateChange from '@/hooks/useStateChange'
import useOutsideClick from '@/hooks/useOutsideClick'
import { MouseEvent } from 'react'

export default function OptionsButton() {
  const { close, ref, onClick, onTransitionEnd } =
    useStateChange<HTMLUListElement>()
  const optionButtonRef = useOutsideClick<HTMLButtonElement>(close)

  const handleButtonClick = (e: MouseEvent) => {
    e.stopPropagation()
    onClick()
  }

  return (
    <List.Row className="relative">
      <Button
        variant="icon"
        size="icon"
        ref={optionButtonRef}
        onClick={handleButtonClick}
      >
        <Icon view="0 -960 960 960" size={18}>
          <path d="M480-160q-33 0-56.5-23.5T400-240q0-33 23.5-56.5T480-320q33 0 56.5 23.5T560-240q0 33-23.5 56.5T480-160Zm0-240q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm0-240q-33 0-56.5-23.5T400-720q0-33 23.5-56.5T480-800q33 0 56.5 23.5T560-720q0 33-23.5 56.5T480-640Z" />
        </Icon>
      </Button>
      <SentenceOptionsDropDown
        targetRef={ref}
        onTransitionEnd={onTransitionEnd}
      />
    </List.Row>
  )
}
