'use client'

import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import useStateChange from '@/hooks/useStateChange'
import MobileMenu from './MobileMenu'
import useOutsideClick from '@/hooks/useOutsideClick'

export default function MenuButton() {
  const { close, onClick, ref, onTransitionEnd } =
    useStateChange<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)

  return (
    <>
      <Button
        variant="icon"
        onClick={onClick}
        ref={buttonRef}
        size="md"
        className="flex sm:hidden"
      >
        <Icon view="0 -960 960 960" size={18}>
          <path d="M120-240v-80h720v80H120Zm0-200v-80h720v80H120Zm0-200v-80h720v80H120Z" />
        </Icon>
      </Button>
      <MobileMenu targetRef={ref} onTransitionEnd={onTransitionEnd} />
    </>
  )
}
