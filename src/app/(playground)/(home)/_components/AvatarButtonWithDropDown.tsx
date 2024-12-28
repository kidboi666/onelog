'use client'

import useDataDrivenAnimation from '@/src/hooks/useStateChange'
import useOutsideClick from '@/src/hooks/useOutsideClick'
import { DropDown } from '@/src/components/DropDown'
import Avatar from '@/src/components/Avatar'
import AvatarButtonWithDropDownContent from '@/src/app/(playground)/(home)/_components/AvatarButtonWithDropDownContent'
import { Container } from '@/src/components/Container'
import { useState } from 'react'

interface Props {
  avatarUrl: string | null
  userId: string
  userName: string | null
  position?: 'bottomRight' | 'topRight' | 'topLeft' | 'bottomLeft'
}

export default function AvatarButtonWithDropDown({
  avatarUrl,
  userId,
  userName,
  position = 'topRight',
}: Props) {
  const [isHover, setHover] = useState(false)
  const { close, ref, onClick, onTransitionEnd } =
    useDataDrivenAnimation<HTMLDivElement>()
  const buttonRef = useOutsideClick<HTMLButtonElement>(close)
  const handleMountDropDownContent = () => setHover(true)

  return (
    <Container onMouseEnter={handleMountDropDownContent}>
      <DropDown.Root>
        <DropDown.Trigger
          targetRef={buttonRef}
          variant="none"
          onClick={onClick}
          className="p-0"
        >
          <Avatar src={avatarUrl} size="sm" shadow="sm" />
        </DropDown.Trigger>
        <DropDown.Content
          ref={ref}
          initStatus="closed"
          position={position}
          onTransitionEnd={onTransitionEnd}
        >
          {isHover && (
            <AvatarButtonWithDropDownContent
              avatarUrl={avatarUrl}
              userName={userName}
              userId={userId}
            />
          )}
        </DropDown.Content>
      </DropDown.Root>
    </Container>
  )
}
