'use client'

import Button from '@/components/shared/Button'
import Icon from '@/components/shared/Icon'
import useDataDrivenAnimation from '@/hooks/useStateChange'
import MobileMenu from './MobileMenu'
import useOutsideClick from '@/hooks/useOutsideClick'

export default function MenuButton() {
  const { close, onClick, open, ref, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLDivElement>(close)

  return (
    <div ref={buttonRef}>
      <Button
        variant="icon"
        onClick={onClick}
        size="md"
        className="flex sm:hidden"
      >
        <Icon view="0 -960 960 960" size={18}>
          <path d="M120-240v-80h240v80H120Zm0-200v-80h480v80H120Zm0-200v-80h720v80H120Z" />
        </Icon>
      </Button>
      <MobileMenu
        targetRef={ref}
        close={close}
        onTransitionEnd={onTransitionEnd}
      />
    </div>
  )
}
